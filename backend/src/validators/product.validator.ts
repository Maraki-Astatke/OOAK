import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1).max(150).trim(),
  slug: z.string().min(1).max(150).trim().toLowerCase(),
  description: z.string().max(5000).optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
  images: z.array(z.string().url()).default([]),
  isActive: z.boolean().default(true),
  categoryId: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(1).max(80).trim(),
  slug: z.string().min(1).max(80).trim().toLowerCase(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;