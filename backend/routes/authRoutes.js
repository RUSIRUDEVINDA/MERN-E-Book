import express from "express";
import { register,login, getAllProfile, getProfile, updateProfile} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profiles", authMiddleware, getAllProfile);
router.get("/profile/:id", authMiddleware, getProfile);
router.put("/profile/:id", authMiddleware, updateProfile);


export default router;
