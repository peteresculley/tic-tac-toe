import { IGame, IGameSummary } from '@entities';
import { getRandomInt } from '@shared';
import { Dao } from '../Db/Dao';

export interface IGameDao {
    getAll: () => Promise<IGame[]>;
    getSummary: () => Promise<IGameSummary>;
    add: (game: IGame) => Promise<number>;
}

export class GameDao extends Dao implements IGameDao {

    /**
     *
     */
    public async getAll(): Promise<IGame[]> {
        try {
            const db = await super.openDb();
            return db.map((game: any) => ({
                winner: game.winner,
                moves: JSON.parse(game.moves),
                id: game.id,
            }));
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     */
    public async getSummary(): Promise<IGameSummary> {
        try {
            const db = await super.openDb();
            let wins1 = 0;
            let wins2 = 0;
            let draws = 0;
            (db as IGame[]).forEach((game) => {
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

    /**
     *
     * @param game
     */
    public async add(game: IGame): Promise<number> {
        try {
            const gameCompressed: any = {
                winner: game.winner,
                moves: game.moves.toString(),
                id: getRandomInt(),
            };
            await super.addEntry(gameCompressed);
            return gameCompressed.id;
        } catch (err) {
            throw err;
        }
    }
}
