"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Statistics_controller_1 = require("./Statistics.controller");
const router = express_1.default.Router();
router.get('/top-rated-week', Statistics_controller_1.StatisticsControllers.getTopRatedThisWeek);
router.get('/newly-added', Statistics_controller_1.StatisticsControllers.getNewlyAdded);
router.get('/editor-picks', Statistics_controller_1.StatisticsControllers.getEditorsPicks);
exports.StatisticsRoutes = router;
