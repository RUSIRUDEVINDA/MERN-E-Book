import express from 'express';
import { generateBookContent, generateBookOutline, summarizeText, extractKeywords, classifyText } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

//apply protect middleware to all routes
router.use(protect);

router.post("/generate-book-outline", generateBookOutline);
router.post("/generate-book-content", generateBookContent);

// Hugging Face routes
router.post("/summarize", summarizeText);
router.post("/keywords", extractKeywords);
router.post("/classify", classifyText);

export default router;