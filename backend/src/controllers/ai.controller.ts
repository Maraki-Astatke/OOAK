import { Request, Response } from 'express';
import { chatWithAgent } from '../services/ai.service.js';
import logger from '../config/logger.js';

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await chatWithAgent(message);
    return res.json({ reply });
  } catch (error: any) {
    logger.error({ err: error }, 'AI chat failed');
    return res.status(500).json({ error: error.message || 'AI chat failed' });
  }
};