import { Router } from 'express';

import authRouter from './auth.js';
import conversationRouter from './conversation.js';

var router = Router();

router.use('/auth/token', authRouter);
router.use('/api/conversations', conversationRouter);

export default router;