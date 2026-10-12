import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 chars')
    .max(128, 'Password too long'),
  name: z.string().min(1).max(80).trim().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password required'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;