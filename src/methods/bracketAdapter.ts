import { StageTypes } from "@/types/StageType"
import { attachChildren } from "./attachChildren";

export function bracketAdapter(data: Group): Bracket | never {
    const group: Group = { ...data };
    const sets = new Array<BracketSet>();
    const rounds = new Array<BracketRound>();
    let roundSets: Array<BracketSet>;
    const roundMap = new Set<string>();

    // If there are no sets, return an empty array without doing all the other stuff
    if (!group.sets) {
        throw new Error("There are no sets in this group");
    }

    // Sort the sets by round
    group.sets.nodes.sort((a, b) => {
        return Math.abs(a.round) - Math.abs(b.round);
    });

    // Convert the sets from the start.gg API data to our BracketSet type
    group.sets.nodes.forEach((set, index) => {
        sets.push({
            slots: [
                {
                    // Checks the entrant and standing field for null and applies values if they exist, defaults if not
                    name: set.slots[0].entrant ? set.slots[0].entrant.name : "",
                    score: set.slots[0].standing ? set.slots[0].standing.stats.score.value : NaN
                },
                {
                    name: set.slots[1].entrant ? set.slots[1].entrant.name : "",
                    score: set.slots[1].standing ? set.slots[1].standing.stats.score.value : NaN
                }
            ],
            id: `${set.round}-${index}`,
            roundName: `${set.fullRoundText}`
        });

        // Keep track of all the rounds by name
        roundMap.add(set.fullRoundText);
    });

    // Go through all the round names that were recorded in the previous loop and construct BracketRound objects 
    roundMap.forEach((roundName) => {
        roundSets = sets.filter((set) => set.roundName === roundName)

        rounds.push({
            name: roundName,
            sets: roundSets
        });
    });

    switch (group.bracketType) {
        case "DOUBLE_ELIMINATION":
            return handleDoubleElim(rounds);

        case "SINGLE_ELIMINATION":
            return handleSingleElim(rounds);

        case "ROUND_ROBIN":
            return handleRoundRobin(rounds);
        default:
            throw new Error(`Unknown bracket type ${data.bracketType}`);
    }
}

function handleRoundRobin(rounds: Array<BracketRound>): RoundRobin {
    const players = new Set<string>();
    const sets = new Map<string, Array<BracketSet>>();

    rounds.forEach((round) => {
        round.sets.forEach((set) => {
            set.slots.forEach((slot) => {
                if (slot.name) {
                    if (!players.has(slot.name)) {
                        players.add(slot.name);
                        sets.set(slot.name, new Array<BracketSet>());
                    }

                    sets.get(slot.name)?.push(set);

                }
            })
        })
    })

    return { type: "ROUND_ROBIN", rounds: new Array<BracketRound>() };
}

/**
 * single elimination bracket parsing method, takes an array of rounds and creates a SingleEliminationBracket object
 * @param rounds The array of rounds to parse
 * @returns a SingleEliminationBracket
 */
function handleSingleElim(rounds: Array<BracketRound>): SingleEliminationBracket {
    const stage: BracketStage = {
        type: StageTypes.WINNERS,
        rounds: rounds
    }

    attachChildren(stage);

    return { type: "SINGLE_ELIMINATION", winners: stage };
}

/**
 * Double elimination bracket parsing method, takes an array of rounds and creates a DoubleEliminationBracket object
 * @param rounds The array of rounds to parse
 * @returns a DoubleEliminationBracket
 */
function handleDoubleElim(rounds: Array<BracketRound>): DoubleEliminationBracket {

    // Create containers for the winners bracket, losers bracket and grand finals
    const winnersRounds: BracketStage = {
        type: StageTypes.WINNERS,
        rounds: new Array<BracketRound>()
    };

    const losersRounds: BracketStage = {
        type: StageTypes.LOSERS,
        rounds: new Array<BracketRound>()
    };

    const grands: BracketStage = {
        type: StageTypes.GRANDS,
        rounds: new Array<BracketRound>()
    };

    // Separate the rounds into their appropriate stages for ease of sorting
    rounds.forEach((round) => {
        if (round.name.startsWith("Winners")) {
            winnersRounds.rounds.unshift(round);
        } else if (round.name.startsWith("Losers")) {
            losersRounds.rounds.unshift(round);
        } else if (round.name.startsWith("Grand")) {
            grands.rounds.unshift(round);
        }
    });

    // Assemble the tree structure of the bracket
    attachChildren(losersRounds);
    attachChildren(winnersRounds);

    // We might not have the Grand Finals in the bracket, so only attach Grand Finals to Winners Finals and Losers Finals if they exist
    if (grands.rounds.length > 0) {
        // If a Grand Finals Reset is in the bracket, make sure it's after the first Grand Finals
        if (grands.rounds.length === 2 && grands.rounds[0].name.includes("Reset")) {
            grands.rounds.reverse();
        }

        // Attach the Grand Finals Reset to the Grand Finals, if applicable
        attachChildren(grands);

        grands.rounds[0].sets[0].children = [];

        // Attach the Winners Finals to the Grand Finals
        grands.rounds[0].sets[0].children.push(winnersRounds.rounds[winnersRounds.rounds.length - 1].sets[0]);

        // Attach the Losers Finals to the Grand Finals, if there is a losers side
        if (losersRounds.rounds.length > 0) {
            grands.rounds[0].sets[0].children.push(losersRounds.rounds[losersRounds.rounds.length - 1].sets[0]);
        }
    }

    return { type: "DOUBLE_ELIMINATION", winners: winnersRounds, losers: losersRounds, grands: grands };
}