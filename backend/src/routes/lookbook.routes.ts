import { Router } from 'express';
import {
  getLookbooks,
  getLookbook,
  create,
  update,
  remove,
} from '../controllers/lookbook.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', getLookbooks);
router.get('/:id', getLookbook);

// Admin
router.post('/', requireAuth, requireRole('ADMIN'), create);
router.put('/:id', requireAuth, requireRole('ADMIN'), update);
router.delete('/:id', requireAuth, requireRole('ADMIN'), remove);

export default router;