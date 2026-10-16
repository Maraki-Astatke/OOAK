import { Router } from 'express';
import {
  submit,
  mySubmissions,
  adminList,
  adminReview,
} from '../controllers/partner.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

// ============================================
// ADMIN (must come first)
// ============================================

router.get('/admin/all', requireRole('ADMIN'), adminList);
router.put('/admin/:id/review', requireRole('ADMIN'), adminReview);

// ============================================
// PARTNER
// ============================================

router.post('/submit', requireRole('PARTNER', 'ADMIN'), submit);
router.get('/my', requireRole('PARTNER', 'ADMIN'), mySubmissions);

export default router;