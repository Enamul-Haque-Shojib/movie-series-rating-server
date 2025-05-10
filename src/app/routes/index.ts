import express from 'express';
import { MediaRoutes } from '../modules/Media/media.routes';
import { AuthRoutes } from '../modules/Auth/Auth.routes';
import { UserActionRoutes } from '../modules/UserAction/UserAction.route';
import { StatisticsRoutes } from '../modules/Statistics/Statistics.route';
import { AdminActionRoutes } from '../modules/AdminAction/AdminAction.route';
import { PurchaseRoutes } from '../modules/Purchase/Purchase.route';



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
        path: '/admin-action',
        route: AdminActionRoutes
    },
    {
        path: '/user-action',
        route: UserActionRoutes
    },
    {
        path: '/purchases',
        route: PurchaseRoutes
    },
    
    {
        path: '/statistics',
        route: StatisticsRoutes
    },
    
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;