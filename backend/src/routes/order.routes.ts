import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getMyOrder,
  adminListOrders,
  adminGetOrder,
  adminUpdateStatus,
} from '../controllers/order.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

// Customer
router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getMyOrder);

// Admin
router.get('/admin/all', requireRole('ADMIN'), adminListOrders);
router.get('/admin/:id', requireRole('ADMIN'), adminGetOrder);
router.put('/admin/:id/status', requireRole('ADMIN'), adminUpdateStatus);

export default router;