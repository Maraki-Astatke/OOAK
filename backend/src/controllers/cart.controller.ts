import { Request, Response } from 'express';
import {
  addToCartSchema,
  updateCartItemSchema,
} from '../validators/cart.validator.js';
import {
  getOrCreateCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../services/cart.service.js';
import logger from '../config/logger.js';

// ============================================
// GET CART
// ============================================

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const cart = await getOrCreateCart(userId);
    return res.json({ cart });
  } catch (error) {
    logger.error({ err: error }, 'Get cart failed');
    return res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// ============================================
// ADD ITEM
// ============================================

export const addItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const parsed = addToCartSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { productId, quantity } = parsed.data;
    const item = await addItemToCart(userId, productId, quantity);
    return res.status(201).json({ item });
  } catch (error: any) {
    logger.error({ err: error }, 'Add to cart failed');
    return res.status(400).json({ error: error.message || 'Failed to add item' });
  }
};

// ============================================
// UPDATE ITEM
// ============================================

export const updateItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { itemId } = req.params;
    const parsed = updateCartItemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const item = await updateCartItem(userId, itemId, parsed.data.quantity);
    return res.json({ item });
  } catch (error: any) {
    logger.error({ err: error }, 'Update cart item failed');
    return res.status(400).json({ error: error.message || 'Failed to update item' });
  }
};

// ============================================
// REMOVE ITEM
// ============================================

export const removeItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { itemId } = req.params;
    await removeCartItem(userId, itemId);
    return res.json({ success: true });
  } catch (error: any) {
    logger.error({ err: error }, 'Remove cart item failed');
    return res.status(400).json({ error: error.message || 'Failed to remove item' });
  }
};

// ============================================
// CLEAR CART
// ============================================

export const clear = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await clearCart(userId);
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Clear cart failed');
    return res.status(500).json({ error: 'Failed to clear cart' });
  }
};