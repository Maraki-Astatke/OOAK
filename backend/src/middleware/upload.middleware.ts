import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

// ============================================
// 1. RECEIPT UPLOAD (PDFs, JPGs)
// ============================================

const RECEIPT_DIR = 'uploads/receipts';
if (!fs.existsSync(RECEIPT_DIR)) {
  fs.mkdirSync(RECEIPT_DIR, { recursive: true });
}

const receiptStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, RECEIPT_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const random = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${random}${ext}`);
  },
});

const RECEIPT_ALLOWED = ['image/jpeg', 'image/png', 'application/pdf'];

export const receiptUpload = multer({
  storage: receiptStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (RECEIPT_ALLOWED.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, or PDF allowed'));
    }
  },
});

// ============================================
// 2. PRODUCT IMAGE UPLOAD (JPGs, PNGs, WEBP)
// ============================================

const PRODUCT_DIR = 'uploads/products';
if (!fs.existsSync(PRODUCT_DIR)) {
  fs.mkdirSync(PRODUCT_DIR, { recursive: true });
}

const productStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PRODUCT_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const random = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${random}${ext}`);
  },
});

const PRODUCT_ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

export const productUpload = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (PRODUCT_ALLOWED.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, or WEBP allowed'));
    }
  },
});