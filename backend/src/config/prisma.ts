import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import logger from './logger.js';
import { env } from './env.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

if (env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug({ query: e.query, duration: e.duration }, 'Prisma query');
  });
}

prisma.$on('error', (e: any) => {
  logger.error({ message: e.message }, 'Prisma error');
});

prisma.$on('warn', (e: any) => {
  logger.warn({ message: e.message }, 'Prisma warning');
});

export default prisma;