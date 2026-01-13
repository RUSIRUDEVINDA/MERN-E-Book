import express from 'express';
import { generateBookContent, generateBookOutline } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

//apply protect middleware to all routes
router.use(protect);

router.post("/generate-book-outline", generateBookOutline);
router.post("/generate-book-content", generateBookContent);

export default router;