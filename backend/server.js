import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env } from './src/config/env.js';
import logger from './src/config/logger.js';
import prisma from './src/config/prisma.js';

const app = express();

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet: sets secure HTTP headers (OWASP)
app.use(helmet());

// CORS: allow only your frontend origin
app.use(
  cors({
    origin: env.NODE_ENV === 'production' ? ['https://yourdomain.com'] : '*',
    credentials: true,
  })
);

// Rate limiting: prevent brute-force + DDoS (OWASP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts per 15 min
  message: { error: 'Too many auth attempts, try again later.' },
});
app.use('/api/auth', authLimiter);

// ============================================
// BODY PARSING
// ============================================

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ============================================
// LOGGING (Pino)
// ============================================

app.use(
  pinoHttp({
    logger,
    // Don't log health checks
    autoLogging: {
      ignore: (req) => req.url === '/health',
    },
  })
);

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error({ error }, 'Health check failed');
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

// ============================================
// ROUTES (we'll add these next)
// ============================================

app.get('/api', (req, res) => {
  res.json({ message: 'Bag Store API v1' });
});

// ============================================
// 404 + ERROR HANDLERS
// ============================================

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  logger.error({ err }, 'Unhandled error');
  res.status(err.status || 500).json({
    error: env.NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

export default app;