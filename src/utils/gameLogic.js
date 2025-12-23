export const GAME_CONSTANTS = {
    TOTAL_STEPS: 5, // Number of steps to reach the finish line
    TEAMS: {
        TEAM_A: 'teamA',
        TEAM_B: 'teamB',
    },
};

export const INITIAL_STATE = {
    screen: 'setup', // 'setup', 'racing', 'victory'
    turn: GAME_CONSTANTS.TEAMS.TEAM_A,
    scores: {
        [GAME_CONSTANTS.TEAMS.TEAM_A]: 0,
        [GAME_CONSTANTS.TEAMS.TEAM_B]: 0,
    },
    positions: {
        [GAME_CONSTANTS.TEAMS.TEAM_A]: 0,
        [GAME_CONSTANTS.TEAMS.TEAM_B]: 0,
    },
    questions: {
        [GAME_CONSTANTS.TEAMS.TEAM_A]: [],
        [GAME_CONSTANTS.TEAMS.TEAM_B]: [],
    },
    winner: null,
};

export const advancePosition = (currentPosition) => {
    return Math.min(currentPosition + 1, GAME_CONSTANTS.TOTAL_STEPS);
};
