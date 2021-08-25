import { Router } from 'express';

import { DeleteToken, GetToken } from '../controllers/auth.js';

var router = Router();

router.get('/token', GetToken);
router.delete('/token', DeleteToken);

export default router;