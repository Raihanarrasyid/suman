import express from "express";
import {
  getProducts,
  getProductById,
  getProductByCategory,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/category", getProductByCategory);
router.get("/:id", getProductById);

export default router;
