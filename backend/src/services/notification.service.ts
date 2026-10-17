import prisma from '../config/prisma.js';
import logger from '../config/logger.js';

// ============================================
// CREATE NOTIFICATION (in-app)
// ============================================

export const createNotification = async (data: {
  userId: string;
  title: string;
  message: string;
  channel?: 'IN_APP' | 'TELEGRAM' | 'EMAIL';
  metadata?: any;
}) => {
  const notification = await prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,
      channel: data.channel || 'IN_APP',
      metadata: data.metadata,
    },
  });

  logger.info(
    { notificationId: notification.id, userId: data.userId },
    'Notification created'
  );

  return notification;
};

// ============================================
// LIST USER NOTIFICATIONS
// ============================================

export const listUserNotifications = async (
  userId: string,
  limit: number = 20
) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
};

// ============================================
// UNREAD COUNT
// ============================================

export const getUnreadCount = async (userId: string) => {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
};

// ============================================
// MARK AS READ
// ============================================

export const markAsRead = async (notificationId: string, userId: string) => {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
};

export const markAllAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};