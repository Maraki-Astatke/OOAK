import { Request, Response } from 'express';
import {
  signupSchema,
  loginSchema,
} from '../validators/auth.validator.js';
import {
  createUser,
  findUserByEmail,
  comparePassword,
  signAccessToken,
  signRefreshToken,
  sanitizeUser,
  verifyRefreshToken,
  findUserById,
} from '../services/auth.service.js';
import logger from '../config/logger.js';

// ============================================
// POST /api/auth/signup
// ============================================

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password, name } = parsed.data;

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const user = await createUser({ email, password, name });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    logger.info({ userId: user.id }, 'User signed up');

    return res.status(201).json({
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error({ error }, 'Signup failed');
    return res.status(500).json({ error: 'Signup failed' });
  }
};

// ============================================
// POST /api/auth/login
// ============================================

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    logger.info({ userId: user.id }, 'User logged in');

    return res.status(200).json({
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error({ error }, 'Login failed');
    return res.status(500).json({ error: 'Login failed' });
  }
};

// ============================================
// POST /api/auth/refresh
// ============================================

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const newAccessToken = signAccessToken(user.id, user.role);
    const newRefreshToken = signRefreshToken(user.id);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error({ error }, 'Refresh failed');
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};

// ============================================
// GET /api/auth/me
// ============================================

export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    logger.error({ error }, 'Me failed');
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};