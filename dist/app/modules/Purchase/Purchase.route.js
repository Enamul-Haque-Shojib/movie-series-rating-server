"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Purchase_controller_1 = require("./Purchase.controller");
const router = express_1.default.Router();
router.post('/add-purchase', Purchase_controller_1.PurchaseControllers.addPurchase);
router.get('/purchase-by-userid/:id', Purchase_controller_1.PurchaseControllers.getAllPurchaseByUserId);
router.get('/all-purchase', Purchase_controller_1.PurchaseControllers.getAllPurchase);
router.post('/create-payment', Purchase_controller_1.PurchaseControllers.createPayment);
exports.PurchaseRoutes = router;
