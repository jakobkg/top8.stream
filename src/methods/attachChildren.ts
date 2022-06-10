export function attachChildren(stage: BracketStage): void {
    for (let roundIndex = stage.rounds.length - 1; roundIndex > 0; roundIndex--) {
        const currRound = stage.rounds[roundIndex];
        const prevRound = stage.rounds[roundIndex - 1];

        // Losers side, two rounds of equal size means that each set only has one predecessor
        if (currRound.sets.length === prevRound.sets.length) {
            stage.rounds[roundIndex].sets.forEach((set, setIndex) => {
                set.children = [prevRound.sets[setIndex]];
            })
        } else { // Losers side and winners side, when a round is half the size of the previous every set has two predecessors
            stage.rounds[roundIndex].sets.forEach((set, setIndex) => {
                set.children = [prevRound.sets[2 * setIndex], prevRound.sets[2 * setIndex + 1]];
            })
        }
    }
}