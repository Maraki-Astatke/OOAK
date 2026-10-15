import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getMyOrder,
  adminListOrders,
  adminGetOrder,
  adminUpdateStatus,
  adminMarkBalancePaid,
} from '../controllers/order.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

// ============================================
// ADMIN ROUTES (must come first)
// ============================================

router.get('/admin/all', requireRole('ADMIN'), adminListOrders);
router.get('/admin/:id', requireRole('ADMIN'), adminGetOrder);
router.put('/admin/:id/status', requireRole('ADMIN'), adminUpdateStatus);
router.put(
  '/admin/:id/mark-balance-paid',
  requireRole('ADMIN'),
  adminMarkBalancePaid
);

// ============================================
// CUSTOMER ROUTES
// ============================================

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getMyOrder);

export default router;