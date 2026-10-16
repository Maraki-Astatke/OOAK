import { z } from 'zod';

export const createGiftSchema = z.object({
  name: z.string().min(1).max(150).trim(),
  slug: z.string().min(1).max(150).trim().toLowerCase(),
  description: z.string().min(10).max(3000).trim(),
  price: z.number().positive(),
  images: z.array(z.string().url()).min(1).max(10),
  isActive: z.boolean().default(true),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(20).default(1),
      })
    )
    .min(1, 'At least one product required'),
});

export const updateGiftSchema = createGiftSchema.partial();