import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchema } from './Auth.validation';
import { AuthControllers } from './Auth.controller';





const router = express.Router();

router.post(
    '/register',
    validateRequest(AuthValidationSchema.registerAuthValidationSchema),
    AuthControllers.registerAuth
);
router.post(
    '/login',
    validateRequest(AuthValidationSchema.loginAuthValidationSchema),
    AuthControllers.loginAuth
);

router.get(
    '/one-auth/:email',
  
    AuthControllers.getSingleAuth,
  );

router.post(
    '/refresh-token',
    AuthControllers.refreshToken
)







export const AuthRoutes = router;