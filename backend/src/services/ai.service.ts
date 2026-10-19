
import OpenAI from 'openai';
import { env } from '../config/env.js';
import prisma from '../config/prisma.js';
import logger from '../config/logger.js';

let openai: OpenAI | null = null;

if (env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
}

// ============================================
// CHAT WITH AI AGENT
// ============================================

export const chatWithAgent = async (userMessage: string) => {
  if (!openai) {
    throw new Error('AI Agent is not configured (missing API key)');
  }

  // 1. Fetch real products from DB to give AI context
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      name: true,
      description: true,
      price: true,
      stock: true,
      isPreOrder: true,
    },
    take: 20, // Limit to top 20 products for context
  });

  const productContext = products
    .map(
      (p) =>
        `- ${p.name}: $${p.price}. ${p.description || ''} (${
          p.isPreOrder ? 'Pre-Order' : p.stock > 0 ? 'In Stock' : 'Out of Stock'
        })`
    )
    .join('\n');

  // 2. System prompt (tells the AI who it is and how to behave)
  const systemPrompt = `
You are a helpful and friendly AI assistant for "Ooak Store", a premium bag e-commerce brand.
Your job is to help customers choose the right bag, answer questions about materials, sizing, and care.

Here are the current products in our store:
${productContext}

Rules:
- Keep answers short and friendly.
- If asked for a recommendation, suggest a specific product from the list above.
- If you don't know the answer (e.g., specific shipping times), tell them to contact support.
- Do not make up products that are not in the list.
`;

  // 3. Call OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and cheap model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = response.choices[0].message.content;
    return reply;
  } catch (error) {
    logger.error({ err: error }, 'OpenAI API failed');
    throw new Error('Failed to get a response from AI');
  }
};