import { Router } from 'express';
import { AddParticipant, StartConversation } from '../controllers/conversation.js';
import { asyncWrapper } from '../helpers/request.js';

var router = Router();

router.post('/', asyncWrapper(StartConversation));
router.post('/:id/participants', asyncWrapper(AddParticipant));

export default router;