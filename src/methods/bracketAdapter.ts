import { StageTypes } from "@/types/StageType"
import { attachChildren } from "./attachChildren";

export function bracketAdapter(data: Phase): Array<BracketStage> {
    const phase: Phase = { ...data };
    const sets = new Array<BracketSet>();
    const rounds = new Array<BracketRound>();
    let roundSets: Array<BracketSet>;
    const roundMap = new Set<string>();
    
    let winnersRounds: BracketStage = {
        type: StageTypes.WINNERS,
        rounds: new Array<BracketRound>()
    };

    let losersRounds: BracketStage= {
        type: StageTypes.LOSERS,
        rounds: new Array<BracketRound>()
    };

    let grands: BracketStage= {
        type: StageTypes.GRANDS,
        rounds: new Array<BracketRound>()
    };

    // If there are no sets, return an empty array without doing all the other stuff
    if (!phase.sets) {
        return new Array<BracketStage>();
    }

    // Sort the sets by round
    phase.sets.nodes.sort((a, b) => {
        return Math.abs(a.round) - Math.abs(b.round);
    });

    // Convert the sets from the start.gg API data to our BracketSet type
    phase.sets.nodes.forEach((set, index) => {
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

    // Separate the rounds into their appropriate stages for ease of sorting
    rounds.forEach((round) => {
        if (round.name.startsWith("Winners")) {
            winnersRounds.rounds.push(round);
        } else if (round.name.startsWith("Losers")) {
            losersRounds.rounds.push(round);
        } else if (round.name.startsWith("Grand")) {
            grands.rounds.push(round);
        }
    });

    attachChildren(losersRounds);
    attachChildren(winnersRounds);
    attachChildren(grands);

    grands.rounds[0].sets[0].children = [];
    grands.rounds[0].sets[0].children.push(winnersRounds.rounds[winnersRounds.rounds.length - 1].sets[0]);

    if (losersRounds.rounds.length > 0) {
        grands.rounds[0].sets[0].children.push(losersRounds.rounds[losersRounds.rounds.length - 1].sets[0]);
    }

    return [winnersRounds, losersRounds, grands];
}