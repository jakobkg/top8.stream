export function readPhaseFromUrl(): number {
    const query = location.pathname;

    if (query.length <= 1) {
        return -1;
    }

    const phaseId = parseInt(query.substring(1));

    if (phaseId < 0) {
        return -1;
    }

    return phaseId;
}