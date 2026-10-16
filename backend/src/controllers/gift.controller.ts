import { Request, Response } from 'express';
import {
  createGiftSchema,
  updateGiftSchema,
} from '../validators/gift.validator.js';
import {
  listGiftPackages,
  getGiftPackageById,
  getGiftPackageBySlug,
  createGiftPackage,
  updateGiftPackage,
  deleteGiftPackage,
} from '../services/gift.service.js';
import logger from '../config/logger.js';

// ============================================
// PUBLIC
// ============================================

export const getGifts = async (_req: Request, res: Response) => {
  try {
    const gifts = await listGiftPackages();
    return res.json({ gifts });
  } catch (error) {
    logger.error({ err: error }, 'List gifts failed');
    return res.status(500).json({ error: 'Failed to fetch gifts' });
  }
};

export const getGift = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gift = await getGiftPackageById(id);
    if (!gift || !gift.isActive) {
      return res.status(404).json({ error: 'Gift package not found' });
    }
    return res.json({ gift });
  } catch (error) {
    logger.error({ err: error }, 'Get gift failed');
    return res.status(500).json({ error: 'Failed to fetch gift' });
  }
};

export const getGiftBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const gift = await getGiftPackageBySlug(slug);
    if (!gift || !gift.isActive) {
      return res.status(404).json({ error: 'Gift package not found' });
    }
    return res.json({ gift });
  } catch (error) {
    logger.error({ err: error }, 'Get gift by slug failed');
    return res.status(500).json({ error: 'Failed to fetch gift' });
  }
};

// ============================================
// ADMIN
// ============================================

export const createGift = async (req: Request, res: Response) => {
  try {
    const parsed = createGiftSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const gift = await createGiftPackage(parsed.data);
    logger.info({ giftId: gift.id }, 'Gift package created');
    return res.status(201).json({ gift });
  } catch (error: any) {
    logger.error({ err: error }, 'Create gift failed');
    return res.status(400).json({ error: error.message || 'Failed to create gift' });
  }
};

export const updateGift = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateGiftSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const gift = await updateGiftPackage(id, parsed.data);
    logger.info({ giftId: id }, 'Gift package updated');
    return res.json({ gift });
  } catch (error: any) {
    logger.error({ err: error }, 'Update gift failed');
    return res.status(400).json({ error: error.message || 'Failed to update gift' });
  }
};

export const deleteGift = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteGiftPackage(id);
    logger.info({ giftId: id }, 'Gift package deleted');
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Delete gift failed');
    return res.status(500).json({ error: 'Failed to delete gift' });
  }
};