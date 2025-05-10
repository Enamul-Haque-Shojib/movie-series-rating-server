"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const media_validation_1 = require("./media.validation");
const media_controller_1 = require("./media.controller");
const router = express_1.default.Router();
router.post('/add', (0, validateRequest_1.default)(media_validation_1.MediaValidationSchema.addMediaValidationSchema), media_controller_1.MediaControllers.addMedia);
router.patch('/update/:id', (0, validateRequest_1.default)(media_validation_1.MediaValidationSchema.updateMediaValidationSchema), media_controller_1.MediaControllers.updateMedia);
router.get('/', media_controller_1.MediaControllers.getAllMedia);
router.get('/one-media/:id', media_controller_1.MediaControllers.getOneMedia);
router.delete('/delete-media/:id', media_controller_1.MediaControllers.deleteMedia);
exports.MediaRoutes = router;
