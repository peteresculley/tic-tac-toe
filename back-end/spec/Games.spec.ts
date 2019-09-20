import app from '@server';
import supertest from 'supertest';

import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';
import { IGame, Game } from '@entities';
import { GameDao } from '@daos';
import { pErr, paramMissingError } from '@shared';

describe('Users Routes', () => {

    const scoresPath = '/api/scores';
    const getScoresPath = `${scoresPath}/all`;
    const getScoresSummaryPath = `${scoresPath}/summary`;
    const addScorePath = `${scoresPath}/add`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getScoresPath}"`, () => {

        it(`should return a JSON object with all the scores and a status code of "${OK}" if the
            request was successful.`, (done) => {

            const games = [
                new Game(1, [0, 3, 1, 4, 2]),
                new Game(2, [7, 4, 6, 0, 2, 8]),
                new Game(0, [3, 0, 4, 5, 1, 7, 8, 2, 6]),
            ];

            spyOn(GameDao.prototype, 'getAll').and.returnValue(Promise.resolve(games));

            agent.get(getScoresPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'Game' objects
                    const retGames = res.body.scores.map((game: IGame) => {
                        return new Game(game);
                    });
                    expect(retGames).toEqual(games);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch scores.';
            spyOn(GameDao.prototype, 'getAll').and.throwError(errMsg);

            agent.get(getScoresPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"GET:${getScoresSummaryPath}"`, () => {

        it(`should return a JSON object with a summary of the scores and a status code of
            "${OK}" if the request was successful.`, (done) => {

            const summary = {
                wins1: 1,
                wins2: 1,
                draws: 1,
            };

            spyOn(GameDao.prototype, 'getSummary').and.returnValue(Promise.resolve(summary));

            agent.get(getScoresSummaryPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.summary).toEqual(summary);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch summary.';
            spyOn(GameDao.prototype, 'getSummary').and.throwError(errMsg);

            agent.get(getScoresSummaryPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"POST:${addScorePath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.post(addScorePath).type('json').send(reqBody);
        };

        const gameData = {
            winner: 1,
            moves: [8, 0, 7, 1, 6],
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {

            spyOn(GameDao.prototype, 'add').and.returnValue(Promise.resolve());

            callApi(gameData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the score param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not add score.';
            spyOn(GameDao.prototype, 'add').and.throwError(errMsg);

            callApi(gameData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });
});
