import express from 'express';
import { exportAsPdf, exportAsDocx } from '../controllers/exportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id/pdf', protect, exportAsPdf);
router.get('/:id/docx', protect, exportAsDocx);

export default router;