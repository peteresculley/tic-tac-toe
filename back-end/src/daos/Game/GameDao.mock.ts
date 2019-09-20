import { IGame, IGameSummary } from '@entities';
import { getRandomInt } from '@shared';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IGameDao } from './GameDao';

export class GameDao extends MockDaoMock implements IGameDao {

    public async getAll(): Promise<IGame[]> {
        try {
            const db = await super.openDb();
            return db.games;
        } catch (err) {
            throw err;
        }
    }

    public async getSummary(): Promise<IGameSummary> {
        try {
            const db = await super.openDb();
            let wins1 = 0;
            let wins2 = 0;
            let draws = 0;
            (db.games as IGame[]).forEach((game) => {
                if (game.winner === 1) {
                    wins1++;
                } else if (game.winner === 2) {
                    wins2++;
                } else {
                    draws++;
                }
            });
            return {
                wins1,
                wins2,
                draws,
            };
        } catch (err) {
            throw err;
        }
    }

    public async add(game: IGame): Promise<number> {
        try {
            const db = await super.openDb();
            game.id = getRandomInt();
            db.games.push(game);
            await super.saveDb(db);
            return game.id;
        } catch (err) {
            throw err;
        }
    }
}
