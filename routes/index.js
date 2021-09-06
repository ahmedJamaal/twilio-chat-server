import { Router } from 'express';

import authRouter from './auth.js';
import conversationRouter from './conversations.js';

var router = Router();

router.use('/auth/token', authRouter);
router.use('/api/conversations', conversationRouter);

export default router;