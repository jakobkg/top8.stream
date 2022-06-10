export function player1Won(set: BracketSet): boolean {
    return set.slots[0].score > set.slots[1].score;
}

export function player2Won(set: BracketSet): boolean {
    return set.slots[1].score > set.slots[0].score;
}