import { Router } from 'express';

import { CreateToken, GetToken } from '../controllers/auth.js';

var router = Router();

router.post('/token', CreateToken);
router.get('/token', GetToken);

export default router;