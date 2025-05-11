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
    '/add-review-like',
    UserActionControllers.addReviewLike
);
router.post(
    '/add-comment',
    UserActionControllers.addComment
);
router.post(
    '/add-review-comment',
    UserActionControllers.addReviewComment
);
router.get(
    '/get-review-comment/:id',
    UserActionControllers.getReviewCommentsByReviewId
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
router.get(
    '/review-by-user/:id',
    UserActionControllers.getAllReviewByUserId
);

router.delete(
    '/user/delete-review/:id',
    UserActionControllers.deleteReview
);
router.get(
    '/user/one-review/:id',
    UserActionControllers.getOneReview
);
router.patch(
    '/user/update-review/:id',
    UserActionControllers.updateReview
);






export const UserActionRoutes = router;