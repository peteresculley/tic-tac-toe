import { GameDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';

// Init shared
const router = Router();
const gameDao = new GameDao();

router.get('/summary', async (req: Request, res: Response) => {
    try {
        const summary = await gameDao.getSummary();
        return res.status(OK).json({summary});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

router.get('/all', async (req: Request, res: Response) => {
    try {
        const scores = await gameDao.getAll();
        return res.status(OK).json({scores});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { winner, moves } = req.body;
        if (!winner || !moves) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        const id = await gameDao.add({ moves, winner });
        return res.status(CREATED).json({
            id,
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default router;
