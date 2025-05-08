import express from 'express';

import { PurchaseControllers } from './Purchase.controller';


const router = express.Router();


router.post(
    '/add-purchase',
    PurchaseControllers.addPurchase
);
router.post(
    '/purchase-by-userid/:id',
    PurchaseControllers.getAllPurchaseByUserId
);
router.post(
    '/all-purchase/:id',
    PurchaseControllers.getAllPurchase
);





export const PurchaseRoutes = router;