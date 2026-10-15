import fs from 'fs';
import crypto from 'crypto';
import prisma from '../config/prisma.js';

export const computeFileHash = (filePath: string): string => {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

export const createReceipt = async (data: {
  orderId: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  fileHash: string;
  amount: number;
}) => {
  // Check for duplicate
  const existing = await prisma.receipt.findUnique({
    where: { fileHash: data.fileHash },
  });
  if (existing) {
    throw new Error('This receipt was already uploaded');
  }

  // Check order belongs to user
  const order = await prisma.order.findFirst({
    where: { id: data.orderId, userId: data.userId },
  });
  if (!order) {
    throw new Error('Order not found');
  }

  return prisma.receipt.create({
    data,
    include: { order: true },
  });
};

export const listUserReceipts = async (userId: string) => {
  return prisma.receipt.findMany({
    where: { userId },
    include: { order: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const listAllReceipts = async (status?: string) => {
  return prisma.receipt.findMany({
    where: status ? { status: status as any } : {},
    include: {
      order: true,
      user: { select: { id: true, email: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const reviewReceipt = async (
  receiptId: string,
  status: 'APPROVED' | 'REJECTED',
  adminNote?: string
) => {
  return prisma.$transaction(async (tx) => {
    const receipt = await tx.receipt.update({
      where: { id: receiptId },
      data: {
        status,
        adminNote,
        reviewedAt: new Date(),
      },
    });

    // If approved, mark order as paid
    if (status === 'APPROVED') {
      await tx.order.update({
        where: { id: receipt.orderId },
        data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
      });
    }

    return receipt;
  });
};