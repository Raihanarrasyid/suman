import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
  createOrder,
  getOrders,
  getOrderByUser,
  updateOrder,
  deleteOrder,
  deleteOrderAdmin,
  payOrder,
  getOrderById,
  adminGetOrderById,
} from "../controllers/order.controller.js";
import paymentUpload from "../middleware/payUp.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, verifyAdmin, getOrders);
router.get("/user", verifyToken, getOrderByUser);
router.put("/pay/:orderId", verifyToken, paymentUpload, payOrder);
router.put("/:orderId", verifyToken, verifyAdmin, updateOrder);
router.delete("/:orderId", verifyToken, verifyAdmin, deleteOrderAdmin);
router.delete("/:orderId/user", verifyToken, deleteOrder);
router.get("/:orderId", verifyToken, getOrderById);
router.get("/admin/:orderId", verifyToken, verifyAdmin, adminGetOrderById);

export default router;
