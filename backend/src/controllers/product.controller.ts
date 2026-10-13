import { Request, Response } from 'express';
import {
  createProductSchema,
  updateProductSchema,
  createCategorySchema,
} from '../validators/product.validator.js';
import {
  listProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories,
  createCategory,
} from '../services/product.service.js';
import logger from '../config/logger.js';

// ============================================
// PUBLIC
// ============================================

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId, search } = req.query as any;
    const products = await listProducts({
      categoryId,
      search,
      isActive: true,
    });
    return res.json({ products });
  } catch (error) {
    logger.error({ err: error }, 'Get products failed');
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product || !product.isActive) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ product });
  } catch (error) {
    logger.error({ err: error }, 'Get product failed');
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const getProductBySlugHandler = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlug(slug);
    if (!product || !product.isActive) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ product });
  } catch (error) {
    logger.error({ err: error }, 'Get product by slug failed');
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await listCategories();
    return res.json({ categories });
  } catch (error) {
    logger.error({ err: error }, 'Get categories failed');
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// ============================================
// ADMIN
// ============================================

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const product = await createProduct(parsed.data);
    logger.info({ productId: product.id }, 'Product created');
    return res.status(201).json({ product });
  } catch (error) {
    logger.error({ err: error }, 'Create product failed');
    return res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const product = await updateProduct(id, parsed.data);
    logger.info({ productId: id }, 'Product updated');
    return res.json({ product });
  } catch (error) {
    logger.error({ err: error }, 'Update product failed');
    return res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    logger.info({ productId: id }, 'Product deleted');
    return res.json({ success: true });
  } catch (error) {
    logger.error({ err: error }, 'Delete product failed');
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }
    const category = await createCategory(parsed.data);
    return res.status(201).json({ category });
  } catch (error) {
    logger.error({ err: error }, 'Create category failed');
    return res.status(500).json({ error: 'Failed to create category' });
  }
};