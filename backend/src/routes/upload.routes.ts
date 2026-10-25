import { Router } from 'express';
import { productUpload } from '../middleware/upload.middleware.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { Request, Response } from 'express';

const router = Router();

// Only admins can upload product images
router.post(
  '/product',
  requireAuth,
  requireRole('ADMIN'),
  productUpload.single('image'),
  (req: Request, res: Response) => {
    try {
      const file = (req as any).file;
      if (!file) return res.status(400).json({ error: 'No file uploaded' });

      // Return the URL path (we serve the uploads folder statically in server.ts)
      const imageUrl = `/uploads/products/${file.filename}`;
      
      return res.json({ url: imageUrl });
    } catch (error) {
      return res.status(500).json({ error: 'Upload failed' });
    }
  }
);

export default router;