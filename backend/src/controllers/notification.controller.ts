import { Request, Response } from 'express';
import {
  listUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from '../services/notification.service.js';
import logger from '../config/logger.js';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { limit } = req.query as any;
    const notifications = await listUserNotifications(
      userId,
      limit ? Number(limit) : 20
    );
    return res.json({ notifications });
  } catch (error) {
    logger.error({ err: error }, 'List notifications failed');
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

export const getUnread = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const count = await getUnreadCount(userId);
    return res.json({ count });
  } catch (error) {
    logger.error({ err: error }, 'Get unread count failed');
    return res.status(500).json({ error: 'Failed to fetch count' });
  }
};

export const readNotification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    await markAsRead(id, userId);
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Mark as read failed');
    return res.status(500).json({ error: 'Failed to mark as read' });
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await markAllAsRead(userId);
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Mark all as read failed');
    return res.status(500).json({ error: 'Failed to mark all as read' });
  }
};