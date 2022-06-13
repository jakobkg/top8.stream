declare type GroupResponse = {
    data: {
        phaseGroup: Group;
    },
    extensions: {
        cacheControl: { // This field is not very well documented but I think this is right
            version: number;
            hints?: Array<{
                path: Array<string>;
                maxAge: number;
                scope: string;
            }>
        }
        queryComplexity: number;
    },
    actionRecords: Array<unknown>; // I have not been able to find documentation on this field
}

declare type Group = {
    name?: string;
    bracketType: BracketType;
    sets?: {
        nodes: Array<{
            fullRoundText: string;
            round: number;
            slots: Array<{
                entrant?: {
                    name: string;
                },
                standing?: {
                    stats: {
                        score: {
                            value: number;
                        }
                    }
                }
            }>
        }>
    }
}