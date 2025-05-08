import express from 'express';

import { UserActionControllers } from './UserAction.controller';



const router = express.Router();

router.post(
    '/add-watchlist',
    UserActionControllers.addWatchList
);
router.post(
    '/add-review',
    UserActionControllers.addReview
);
router.post(
    '/add-like',
    UserActionControllers.addLike
);
router.post(
    '/add-unlike',
    UserActionControllers.addUnLike
);
router.post(
    '/add-comment',
    UserActionControllers.addComment
);

router.get(
    '/user-comments/:id',
    UserActionControllers.getAllCommentsByMediaId
);
router.get(
    '/user-watchlist/:id',
    UserActionControllers.getAllWatchListByUserId
);
router.get(
    '/user-review/:id',
    UserActionControllers.getAllReviewByMediaId
);

router.delete(
    '/user/delete-review/:id',
    UserActionControllers.deleteReview
);






export const UserActionRoutes = router;