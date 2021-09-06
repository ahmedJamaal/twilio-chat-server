import { Router } from 'express';
import { AddParticipant, StartConversation } from '../controllers/conversations.js';
import { asyncWrapper } from '../utils/controller.js';

var router = Router();

router.post('/', asyncWrapper(StartConversation));
router.post('/:id/participants', asyncWrapper(AddParticipant));

export default router;