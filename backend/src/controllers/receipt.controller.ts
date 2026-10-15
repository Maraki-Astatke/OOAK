import { Request, Response } from 'express';
import fs from 'fs';
import {
  computeFileHash,
  createReceipt,
  listUserReceipts,
  listAllReceipts,
  reviewReceipt,
} from '../services/receipt.service.js';
import logger from '../config/logger.js';

// ============================================
// CUSTOMER: Upload receipt
// ============================================

export const uploadReceipt = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const file = (req as any).file;
    const { orderId, amount } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'Receipt file required' });
    }

    if (!orderId || !amount) {
      fs.unlinkSync(file.path); // cleanup
      return res.status(400).json({ error: 'orderId and amount required' });
    }

    const fileHash = computeFileHash(file.path);

    const receipt = await createReceipt({
      orderId,
      userId,
      fileUrl: `/uploads/receipts/${file.filename}`,
      fileName: file.originalname,
      fileHash,
      amount: Number(amount),
    });

    logger.info({ receiptId: receipt.id, orderId }, 'Receipt uploaded');
    return res.status(201).json({ receipt });
  } catch (error: any) {
    logger.error({ err: error }, 'Receipt upload failed');
    return res.status(400).json({ error: error.message || 'Upload failed' });
  }
};

export const myReceipts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const receipts = await listUserReceipts(userId);
    return res.json({ receipts });
  } catch (error) {
    logger.error({ err: error }, 'List receipts failed');
    return res.status(500).json({ error: 'Failed to fetch receipts' });
  }
};

// ============================================
// ADMIN
// ============================================

export const adminListReceipts = async (req: Request, res: Response) => {
  try {
    const { status } = req.query as any;
    const receipts = await listAllReceipts(status);
    return res.json({ receipts });
  } catch (error) {
    logger.error({ err: error }, 'Admin list receipts failed');
    return res.status(500).json({ error: 'Failed to fetch receipts' });
  }
};

export const adminReviewReceipt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const receipt = await reviewReceipt(id, status, adminNote);
    logger.info({ receiptId: id, status }, 'Receipt reviewed');
    return res.json({ receipt });
  } catch (error) {
    logger.error({ err: error }, 'Admin review receipt failed');
    return res.status(500).json({ error: 'Failed to review receipt' });
  }
};