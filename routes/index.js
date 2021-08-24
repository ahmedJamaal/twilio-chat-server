import { Router } from 'express';

import conversationRouter from './conversation.js';

var router = Router();

router.use('/conversation', conversationRouter);

export default router;