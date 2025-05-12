import express from 'express';
import { StatisticsControllers } from './Statistics.controller';


const router = express.Router();


router.get(
    '/total-media-admin',
    StatisticsControllers.getTotalStatisticsForAdmin
);
router.get(
    '/total-media-user/:id',
    StatisticsControllers.getTotalStatisticsForUser
);
router.get(
    '/highest-rated-movie',
    StatisticsControllers.getHighestRatedMovies
);
router.get(
    '/highest-rated-series',
    StatisticsControllers.getHighestRatedSeries
);
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