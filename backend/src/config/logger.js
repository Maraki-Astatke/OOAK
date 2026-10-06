import pino from 'pino';
import { env } from './env.js';

const redactPaths = [
  // Auth headers
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',

  // Credentials
  'body.password',
  'body.currentPassword',
  'body.newPassword',
  'body.confirmPassword',
  'body.token',
  'body.refreshToken',

  // Payment data
  'body.cardNumber',
  'body.cvv',
  'body.bankAccount',
  'body.receiptNumber',

  // PII
  'body.email',
  'body.phone',
  'body.address',

  // Wildcards
  '*.password',
  '*.token',
  '*.secret',
];

const logger = pino({
  level: env.NODE_ENV === 'production' ? 'warn' : env.LOG_LEVEL,
  redact: {
    paths: redactPaths,
    censor: '[REDACTED]',
  },
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});

export default logger;