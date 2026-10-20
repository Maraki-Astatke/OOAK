import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import logger from '../config/logger.js';

let transporter: any = null;

// ============================================
// INIT EMAIL TRANSPORTER
// ============================================

export const initEmailTransporter = () => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    logger.warn('SMTP credentials not set — Email disabled');
    return;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  logger.info('📧 Email transporter ready');
};

// ============================================
// SEND EMAIL
// ============================================

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<boolean> => {
  if (!transporter) {
    logger.warn('Email transporter not initialized');
    return false;
  }

  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM || '"Ooak Store" <no-reply@ooakstore.com>',
      to,
      subject,
      html,
    });
    logger.info({ to, subject }, 'Email sent');
    return true;
  } catch (error) {
    logger.error({ err: error, to }, 'Email send failed');
    return false;
  }
};