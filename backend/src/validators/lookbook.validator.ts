import { z } from 'zod';

export const createLookbookSchema = z.object({
  title: z.string().min(1).max(150).trim(),
  imageUrl: z.string().url(),
  isActive: z.boolean().default(true),
  hotspots: z
    .array(
      z.object({
        productId: z.string().min(1),
        x: z.number().min(0).max(100),
        y: z.number().min(0).max(100),
      })
    )
    .default([]),
});

export const updateLookbookSchema = createLookbookSchema.partial();