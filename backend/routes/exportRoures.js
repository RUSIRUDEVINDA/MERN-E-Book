import express from 'express';
import { exportAsPdf, exportAsDocx } from '../controllers/exportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pdf/:id', protect, exportAsPdf);
router.get('/docx/:id', protect, exportAsDocx);

export default router;