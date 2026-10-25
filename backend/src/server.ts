import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import logger from './config/logger.js';
import prisma from './config/prisma.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import partnerRoutes from './routes/partner.routes.js';
import giftRoutes from './routes/gift.routes.js';
import lookbookRoutes from './routes/lookbook.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import { initTelegramBot } from './services/telegram.service.js';
import { initEmailTransporter } from './services/email.service.js';
import aiRoutes from './routes/ai.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import AddProduct from './pages/admin/AddProduct';

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
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
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
    autoLogging: {
      ignore: (req: Request) => req.url === '/health',
    },
  })
);

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', async (_req: Request, res: Response) => {
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
// ROUTES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/lookbooks', lookbookRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api', (_req: Request, res: Response) => {
  res.json({ message: 'Bag Store API v1' });
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// ============================================
// 404 + ERROR HANDLERS
// ============================================

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
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

initTelegramBot();
initEmailTransporter();
// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

export default app;