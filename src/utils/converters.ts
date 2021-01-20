enum EMatchState {
    created = 0,
    voting = 1,
    waitingForServer = 2,
    playing = 3,
    canceled = 4,
    finished = 5,
    waitingForPlayers = 6,
}

enum EPartyState {
    waiting = 0,
    searching = 1,
    found = 2
}

export const partyStateToText = (state: EPartyState) => {
    if (state === EPartyState.found) return "found";
    else if (state === EPartyState.searching) return "searching";
    else if (state === EPartyState.waiting) return "waiting";
    else return "invalid";
}

export const matchStateToText = (state: EMatchState) => {
    if (state === EMatchState.canceled) return "canceled";
    else if (state === EMatchState.created) return "created";
    else if (state === EMatchState.finished) return "finished";
    else if (state === EMatchState.playing) return "playing";
    else if (state === EMatchState.voting) return "voting";
    else if (state === EMatchState.waitingForPlayers) return "waiting for players";
    else if (state === EMatchState.waitingForServer) return "waiting for server";
    else return "invalid";
}