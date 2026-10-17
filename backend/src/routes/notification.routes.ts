import { Router } from 'express';
import {
  getNotifications,
  getUnread,
  readNotification,
  readAll,
} from '../controllers/notification.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getNotifications);
router.get('/unread-count', getUnread);
router.put('/:id/read', readNotification);
router.put('/read-all', readAll);

export default router;