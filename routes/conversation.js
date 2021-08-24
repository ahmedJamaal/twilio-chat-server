import { Router } from 'express';
import { StartConversation } from '../controllers/conversation.js';
import { asyncWrapper } from '../helpers/request.js';

var router = Router();

router.post('/', asyncWrapper(StartConversation));

export default router;