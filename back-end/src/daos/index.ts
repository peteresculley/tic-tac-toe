const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let gameDaoPath = './Game/GameDao';

if (usingMockDb === 'true') {
    gameDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { GameDao } = require(gameDaoPath);
