import { z } from 'zod';

export const createOrderSchema = z.object({
  name: z.string().min(1).max(120).trim(),
  phone: z.string().min(5).max(20).trim(),
  address: z.string().min(5).max(300).trim(),
  notes: z.string().max(500).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
  ]),
});