import adminController from '../controllers/admin.controller.js';
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, adminController.getAdmin);

// delete product
router.delete('/product/:id', verifyToken, verifyAdmin, adminController.deleteProduct);

export default router;
