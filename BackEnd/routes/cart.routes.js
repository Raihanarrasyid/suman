import express from "express";
import { getCart, saveProductToCart, incrementProductInCart, editProductInCart } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getCart); // get cart information
router.post("/", verifyToken, saveProductToCart); // insert product to cart with product id
router.put("/", verifyToken, incrementProductInCart); // increment product amount in cart with product id
router.post("/edit", verifyToken, editProductInCart); // edit product amount in cart with product id

export default router;