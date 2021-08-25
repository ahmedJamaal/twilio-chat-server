import { Router } from 'express';

import conversationRouter from './conversation.js';

var router = Router();

router.use('/conversations', conversationRouter);

export default router;