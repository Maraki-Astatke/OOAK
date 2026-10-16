import { Request, Response } from 'express';
import {
  submitProductSchema,
  reviewSubmissionSchema,
} from '../validators/partner.validator.js';
import {
  submitProduct,
  listMySubmissions,
  listAllSubmissions,
  reviewSubmission,
} from '../services/partner.service.js';
import logger from '../config/logger.js';

// ============================================
// PARTNER
// ============================================

export const submit = async (req: Request, res: Response) => {
  try {
    const partnerId = (req as any).userId;
    const parsed = submitProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const submission = await submitProduct(partnerId, parsed.data);
    logger.info({ submissionId: submission.id }, 'Partner submitted product');
    return res.status(201).json({ submission });
  } catch (error) {
    logger.error({ err: error }, 'Partner submit failed');
    return res.status(500).json({ error: 'Failed to submit product' });
  }
};

export const mySubmissions = async (req: Request, res: Response) => {
  try {
    const partnerId = (req as any).userId;
    const submissions = await listMySubmissions(partnerId);
    return res.json({ submissions });
  } catch (error) {
    logger.error({ err: error }, 'List submissions failed');
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// ============================================
// ADMIN
// ============================================

export const adminList = async (req: Request, res: Response) => {
  try {
    const { status } = req.query as any;
    const submissions = await listAllSubmissions(status);
    return res.json({ submissions });
  } catch (error) {
    logger.error({ err: error }, 'Admin list submissions failed');
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

export const adminReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = reviewSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const submission = await reviewSubmission(
      id,
      parsed.data.status,
      parsed.data.adminNote
    );
    logger.info({ submissionId: id, status: parsed.data.status }, 'Submission reviewed');
    return res.json({ submission });
  } catch (error) {
    logger.error({ err: error }, 'Admin review failed');
    return res.status(500).json({ error: 'Failed to review submission' });
  }
};