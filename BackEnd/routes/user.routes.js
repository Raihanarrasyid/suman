import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js"
import { getUser, updateUser } from "../controllers/user.controller.js"

const router = express.Router();

router.get("/", verifyToken, getUser); // get User information
router.put("/", verifyToken, updateUser); // Update User


export default router;