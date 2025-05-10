"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(Auth_validation_1.AuthValidationSchema.registerAuthValidationSchema), Auth_controller_1.AuthControllers.registerAuth);
router.post('/login', (0, validateRequest_1.default)(Auth_validation_1.AuthValidationSchema.loginAuthValidationSchema), Auth_controller_1.AuthControllers.loginAuth);
router.get('/one-auth/:email', Auth_controller_1.AuthControllers.getSingleAuth);
router.post('/refresh-token', Auth_controller_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
