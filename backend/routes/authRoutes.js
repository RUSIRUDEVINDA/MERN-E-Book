import express from "express";
import { register,login, getAllProfile, getProfile, updateProfile} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profiles", protect, getAllProfile);
router.get("/profile/:id", protect, getProfile);
router.put("/profile/:id", protect, updateProfile);


export default router;
