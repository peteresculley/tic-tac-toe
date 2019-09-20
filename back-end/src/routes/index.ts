import { Router } from 'express';
import ScoreRouter from './Scores';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/scores', ScoreRouter);

// Export the base-router
export default router;
