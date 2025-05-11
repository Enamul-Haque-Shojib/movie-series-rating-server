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
router.patch(
    '/add-editor-picked/:id',
    StatisticsControllers.addEditorsPicks
);
router.patch(
    '/remove-editor-picked/:id',
    StatisticsControllers.removeEditorsPicks
);
router.get(
    '/editor-picked',
    StatisticsControllers.getEditorsPicks
);




export const StatisticsRoutes = router;