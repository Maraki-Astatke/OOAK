import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { env } from '../config/env.js';
import logger from '../config/logger.js';

const SALT_ROUNDS = 12;

// ============================================
// PASSWORD HELPERS
// ============================================

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// ============================================
// TOKEN HELPERS
// ============================================

export const signAccessToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

export const signRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
};

// ============================================
// USER HELPERS
// ============================================

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: {
  email: string;
  password: string;
  name?: string;
}) => {
  const hashed = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name,
      provider: 'local',
    },
  });
};

export const sanitizeUser = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};