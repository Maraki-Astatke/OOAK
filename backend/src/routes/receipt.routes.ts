import { Router } from 'express';
import {
  uploadReceipt,
  myReceipts,
  adminListReceipts,
  adminReviewReceipt,
} from '../controllers/receipt.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { receiptUpload } from '../middleware/upload.middleware.js';

const router = Router();

router.use(requireAuth);

// Customer
router.post('/upload', receiptUpload.single('receipt'), uploadReceipt);
router.get('/my', myReceipts);

// Admin
router.get('/admin/all', requireRole('ADMIN'), adminListReceipts);
router.put('/admin/:id/review', requireRole('ADMIN'), adminReviewReceipt);

export default router;