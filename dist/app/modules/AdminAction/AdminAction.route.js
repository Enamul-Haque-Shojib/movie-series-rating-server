"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminActionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AdminAction_controller_1 = require("./AdminAction.controller");
const router = express_1.default.Router();
router.patch('/editor-pick/:id', AdminAction_controller_1.AdminActionControllers.editorPick);
router.patch('/approve-review/:id', AdminAction_controller_1.AdminActionControllers.approveReview);
router.patch('/publish-review/:id', AdminAction_controller_1.AdminActionControllers.publishReview);
router.patch('/unpublish-review/:id', AdminAction_controller_1.AdminActionControllers.unpublishReview);
router.get('/get-review', AdminAction_controller_1.AdminActionControllers.getAllReviews);
router.delete('/admin/delete-review/:id', AdminAction_controller_1.AdminActionControllers.deleteReview);
exports.AdminActionRoutes = router;
