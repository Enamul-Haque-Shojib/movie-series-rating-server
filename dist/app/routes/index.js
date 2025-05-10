"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_routes_1 = require("../modules/Media/media.routes");
const Auth_routes_1 = require("../modules/Auth/Auth.routes");
const UserAction_route_1 = require("../modules/UserAction/UserAction.route");
const Statistics_route_1 = require("../modules/Statistics/Statistics.route");
const AdminAction_route_1 = require("../modules/AdminAction/AdminAction.route");
const Purchase_route_1 = require("../modules/Purchase/Purchase.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/medias',
        route: media_routes_1.MediaRoutes
    },
    {
        path: '/auths',
        route: Auth_routes_1.AuthRoutes
    },
    {
        path: '/admin-action',
        route: AdminAction_route_1.AdminActionRoutes
    },
    {
        path: '/user-action',
        route: UserAction_route_1.UserActionRoutes
    },
    {
        path: '/purchases',
        route: Purchase_route_1.PurchaseRoutes
    },
    {
        path: '/statistics',
        route: Statistics_route_1.StatisticsRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
