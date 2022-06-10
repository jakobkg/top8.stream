declare type BracketSet = {
    id: string;
    roundName: string;
    slots: Array<SetSlot>;
    children?: Array<BracketSet>;
}