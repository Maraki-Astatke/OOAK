import { z } from 'zod';

export const submitProductSchema = z.object({
  name: z.string().min(1).max(150).trim(),
  description: z.string().min(10).max(3000).trim(),
  category: z.string().min(1).max(80).trim(),
  price: z.number().positive(),
  images: z.array(z.string().url()).min(1).max(10),
});

export const reviewSubmissionSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  adminNote: z.string().max(500).optional(),
});