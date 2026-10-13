import { Router } from 'express';
import {
  getProducts,
  getProduct,
  getProductBySlugHandler,
  getCategories,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  createCategoryHandler,
} from '../controllers/product.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// ============================================
// PUBLIC
// ============================================

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/slug/:slug', getProductBySlugHandler);
router.get('/:id', getProduct);

// ============================================
// ADMIN ONLY
// ============================================

router.post('/', requireAuth, requireRole('ADMIN'), createProductHandler);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateProductHandler);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteProductHandler);
router.post(
  '/categories',
  requireAuth,
  requireRole('ADMIN'),
  createCategoryHandler
);

export default router;