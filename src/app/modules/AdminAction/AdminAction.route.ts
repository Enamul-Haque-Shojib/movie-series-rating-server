


import express from 'express';
import { AdminActionControllers } from './AdminAction.controller';



const router = express.Router();


router.patch(
    '/editor-pick/:id',
    AdminActionControllers.editorPick
);





export const AdminActionRoutes = router;