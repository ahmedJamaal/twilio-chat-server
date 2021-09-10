import { Router } from 'express';

import conversationRouter from './conversations.js';

var router = Router();

router.use('/api/conversations', conversationRouter);

export default router;