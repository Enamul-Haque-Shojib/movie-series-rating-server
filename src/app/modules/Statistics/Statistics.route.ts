import express from 'express';
import { StatisticsControllers } from './Statistics.controller';


const router = express.Router();


router.get(
    '/top-rated-week',
    StatisticsControllers.getTopRatedThisWeek
);
router.get(
    '/newly-added',
    StatisticsControllers.getNewlyAdded
);
router.get(
    '/editor-picks',
    StatisticsControllers.getEditorsPicks
);




export const StatisticsRoutes = router;