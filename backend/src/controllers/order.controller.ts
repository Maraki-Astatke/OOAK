import { Request, Response } from 'express';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../validators/order.validator.js';
import {
  createOrderFromCart,
  listUserOrders,
  getUserOrderById,
  listAllOrders,
  getOrderById,
  updateOrderStatus,
} from '../services/order.service.js';
import logger from '../config/logger.js';

// ============================================
// CUSTOMER
// ============================================

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const order = await createOrderFromCart(userId, parsed.data);
    logger.info({ orderId: order.id, userId }, 'Order created');
    return res.status(201).json({ order });
  } catch (error: any) {
    logger.error({ err: error }, 'Create order failed');
    return res.status(400).json({ error: error.message || 'Failed to create order' });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const orders = await listUserOrders(userId);
    return res.json({ orders });
  } catch (error) {
    logger.error({ err: error }, 'List orders failed');
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getMyOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const order = await getUserOrderById(userId, id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({ order });
  } catch (error) {
    logger.error({ err: error }, 'Get order failed');
    return res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// ============================================
// ADMIN
// ============================================

export const adminListOrders = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus } = req.query as any;
    const orders = await listAllOrders({ status, paymentStatus });
    return res.json({ orders });
  } catch (error) {
    logger.error({ err: error }, 'Admin list orders failed');
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const adminGetOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({ order });
  } catch (error) {
    logger.error({ err: error }, 'Admin get order failed');
    return res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const adminUpdateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const order = await updateOrderStatus(id, parsed.data.status);
    logger.info({ orderId: id, status: parsed.data.status }, 'Order status updated');
    return res.json({ order });
  } catch (error) {
    logger.error({ err: error }, 'Admin update status failed');
    return res.status(500).json({ error: 'Failed to update order status' });
  }
};

// ============================================
// ADMIN: MARK BALANCE PAID
// ============================================

export const adminMarkBalancePaid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { markBalancePaid } = await import('../services/order.service.js');
    const order = await markBalancePaid(id);
    logger.info({ orderId: id }, 'Balance marked as paid');
    return res.json({ order });
  } catch (error: any) {
    logger.error({ err: error }, 'Mark balance paid failed');
    return res.status(400).json({ error: error.message || 'Failed' });
  }
};