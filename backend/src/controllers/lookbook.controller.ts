import { Request, Response } from 'express';
import {
  createLookbookSchema,
  updateLookbookSchema,
} from '../validators/lookbook.validator.js';
import {
  listLookbooks,
  getLookbookById,
  createLookbook,
  updateLookbook,
  deleteLookbook,
} from '../services/lookbook.service.js';
import logger from '../config/logger.js';

// ============================================
// PUBLIC
// ============================================

export const getLookbooks = async (_req: Request, res: Response) => {
  try {
    const lookbooks = await listLookbooks();
    return res.json({ lookbooks });
  } catch (error) {
    logger.error({ err: error }, 'List lookbooks failed');
    return res.status(500).json({ error: 'Failed to fetch lookbooks' });
  }
};

export const getLookbook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lookbook = await getLookbookById(id as string);
    if (!lookbook || !lookbook.isActive) {
      return res.status(404).json({ error: 'Lookbook not found' });
    }
    return res.json({ lookbook });
  } catch (error) {
    logger.error({ err: error }, 'Get lookbook failed');
    return res.status(500).json({ error: 'Failed to fetch lookbook' });
  }
};

// ============================================
// ADMIN
// ============================================

export const create = async (req: Request, res: Response) => {
  try {
    const parsed = createLookbookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const lookbook = await createLookbook(parsed.data);
    logger.info({ lookbookId: lookbook.id }, 'Lookbook created');
    return res.status(201).json({ lookbook });
  } catch (error: any) {
    logger.error({ err: error }, 'Create lookbook failed');
    return res.status(400).json({ error: error.message || 'Failed' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateLookbookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const lookbook = await updateLookbook(id as string, parsed.data);
    return res.json({ lookbook });
  } catch (error: any) {
    logger.error({ err: error }, 'Update lookbook failed');
    return res.status(400).json({ error: error.message || 'Failed' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteLookbook(id as string);
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Delete lookbook failed');
    return res.status(500).json({ error: 'Failed to delete lookbook' });
  }
};