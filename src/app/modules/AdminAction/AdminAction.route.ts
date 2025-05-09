


import express from 'express';
import { AdminActionControllers } from './AdminAction.controller';



const router = express.Router();


router.patch(
    '/editor-pick/:id',
    AdminActionControllers.editorPick
);
router.patch(
    '/approve-review/:id',
    AdminActionControllers.approveReview
);
router.patch(
    '/publish-review/:id',
    AdminActionControllers.publishReview
);
router.patch(
    '/unpublish-review/:id',
    AdminActionControllers.unpublishReview
);
router.get(
    '/get-review',
    AdminActionControllers.getAllReviews
);
router.delete(
    '/admin/delete-review/:id',
    AdminActionControllers.deleteReview
);





export const AdminActionRoutes = router;