import express from 'express';

import { PurchaseControllers } from './Purchase.controller';


const router = express.Router();


router.post(
    '/add-purchase',
    PurchaseControllers.addPurchase
);
router.get(
    '/purchase-by-userid/:id',
    PurchaseControllers.getAllPurchaseByUserId
);
router.get(
    '/all-purchase',
    PurchaseControllers.getAllPurchase
);
router.post(
    '/create-payment',
    PurchaseControllers.createPayment
);





export const PurchaseRoutes = router;