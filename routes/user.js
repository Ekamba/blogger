import express from 'express';
// import auth from '../middleware/auth.js';
const router = express.Router();

import { login, register } from '../controllers/user.js';

router.post('/register', register);
router.post('/login', login);
// router.post('/updateUser', auth, updateUser);

export default router;
