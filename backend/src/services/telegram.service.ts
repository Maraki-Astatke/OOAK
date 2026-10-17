import TelegramBot from 'node-telegram-bot-api';
import { env } from '../config/env.js';
import prisma from '../config/prisma.js';
import logger from '../config/logger.js';

let bot: TelegramBot | null = null;

// ============================================
// INIT BOT (called once at server start)
// ============================================

export const initTelegramBot = () => {
  if (!env.TELEGRAM_BOT_TOKEN) {
    logger.warn('TELEGRAM_BOT_TOKEN not set — Telegram disabled');
    return;
  }

 bot = new (TelegramBot as any)(env.TELEGRAM_BOT_TOKEN, { polling: true });

  // Listen for /start <userId> command
  // The user opens t.me/YourBot?start=<userId> to link their account
  bot.onText(/^\/start(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id.toString();
    const userId = match?.[1]; // the userId passed after /start

    if (!userId) {
      await bot!.sendMessage(
        chatId,
        '👋 Welcome to Bag Store!\n\nTo link your account, please log in to your Bag Store account and click "Connect Telegram".'
      );
      return;
    }

    try {
      // Find user and save chat ID
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        await bot!.sendMessage(chatId, '❌ Invalid link. Please try again from your account page.');
        return;
      }

      await prisma.user.update({
        where: { id: userId },
        data: { telegramChatId: chatId },
      });

      await bot!.sendMessage(
        chatId,
        `✅ Your account (${user.email}) is now linked! You'll receive order updates here.`
      );

      logger.info({ userId, chatId }, 'Telegram linked');
    } catch (error) {
      logger.error({ err: error }, 'Telegram link failed');
      await bot!.sendMessage(chatId, '❌ Something went wrong. Please try again.');
    }
  });

  logger.info('🤖 Telegram bot started');
};

// ============================================
// SEND MESSAGE
// ============================================

export const sendTelegramMessage = async (
  userId: string,
  message: string
): Promise<boolean> => {
  if (!bot) return false;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { telegramChatId: true },
    });

    if (!user?.telegramChatId) {
      logger.debug({ userId }, 'User has no Telegram chat ID');
      return false;
    }

    await bot.sendMessage(user.telegramChatId, message);
    logger.info({ userId }, 'Telegram message sent');
    return true;
  } catch (error) {
    logger.error({ err: error, userId }, 'Telegram send failed');
    return false;
  }
};