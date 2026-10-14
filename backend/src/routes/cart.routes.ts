import { Router } from 'express';
import {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clear,
} from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// All cart routes require login
router.use(requireAuth);

router.get('/', getCart);
router.post('/items', addItem);
router.put('/items/:itemId', updateItem);
router.delete('/items/:itemId', removeItem);
router.delete('/', clear);

export default router;