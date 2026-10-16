import { Router } from 'express';
import {
  getGifts,
  getGift,
  getGiftBySlug,
  createGift,
  updateGift,
  deleteGift,
} from '../controllers/gift.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// ============================================
// PUBLIC
// ============================================

router.get('/', getGifts);
router.get('/slug/:slug', getGiftBySlug);
router.get('/:id', getGift);

// ============================================
// ADMIN
// ============================================

router.post('/', requireAuth, requireRole('ADMIN'), createGift);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateGift);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteGift);

export default router;