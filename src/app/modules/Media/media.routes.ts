import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MediaValidationSchema } from './media.validation';
import { MediaControllers } from './media.controller';



const router = express.Router();

router.post(
    '/add',
    validateRequest(MediaValidationSchema.addMediaValidationSchema),
    MediaControllers.addMedia
);

router.patch(
    '/update/:id',
    validateRequest(MediaValidationSchema.updateMediaValidationSchema),
    MediaControllers.updateMedia
);

router.get(
    '/',
    MediaControllers.getAllMedia
);
router.get(
    '/one-media/:id',
    MediaControllers.getOneMedia
);
router.delete(
    '/delete-media/:id',
    MediaControllers.deleteMedia
);






export const MediaRoutes = router;