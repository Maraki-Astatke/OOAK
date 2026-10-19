import { Router } from 'express';
import { chat } from '../controllers/ai.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Require login for AI chat (to prevent abuse)
router.use(requireAuth);

router.post('/chat', chat);

export default router;