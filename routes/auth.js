import { Router } from 'express';

import { DeleteToken, GetToken } from '../controllers/auth.js';

var router = Router();

router.get('/', GetToken);
router.delete('/', DeleteToken);

export default router;