import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
  createAddress,
  getAddresses,
  getMainAddressByUser,
  updateAddress,
  deleteAddress,
  setMainAddress,
  getAddressById,
  AdminGetAddressById,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/", verifyToken, createAddress);
router.get("/", verifyToken, getAddresses);
router.get("/main", verifyToken, getMainAddressByUser);
router.put("/setMain/:addressId", verifyToken, setMainAddress);
router.put("/:addressId", verifyToken, updateAddress);
router.delete("/:addressId", verifyToken, deleteAddress);
router.get("/:addressId", verifyToken, getAddressById);
router.get("/admin/:addressId", verifyToken, verifyAdmin, AdminGetAddressById);

export default router;
