import prisma from '../config/prisma.js';
import logger from '../config/logger.js';
import { sendTelegramMessage } from './telegram.service.js';
import { sendEmail } from './email.service.js';


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
  // 1. Save to DB (In-App)
  const notification = await prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,
      channel: data.channel || 'IN_APP',
      metadata: data.metadata,
    },
  });

  // 2. Send Telegram (if linked)
  await sendTelegramMessage(
    data.userId,
    `🔔 ${data.title}\n\n${data.message}`
  );

  // 3. Send Email
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
    select: { email: true },
  });

  if (user?.email) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${data.title}</h2>
        <p style="color: #555; font-size: 16px;">${data.message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">Ooak Store</p>
      </div>
    `;
    await sendEmail(user.email, data.title, html);
  }

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