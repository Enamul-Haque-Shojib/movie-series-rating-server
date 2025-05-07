import express from 'express';
import { MediaRoutes } from '../modules/Media/media.routes';
import { AuthRoutes } from '../modules/Auth/Auth.routes';
import { UserActionRoutes } from '../modules/UserAction/UserAction.route';



const router = express.Router();

const moduleRoutes = [
    {
        path: '/medias',
        route: MediaRoutes
    },
    {
        path: '/auths',
        route: AuthRoutes
    },
    
    {
        path: '/user-action',
        route: UserActionRoutes
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;