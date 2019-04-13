import express from 'express';
import user from '../controller/userController';

const router = express.Router();

router.get('/users', user.list);
router.post('/auth/signup', user.signup);
router.post('/auth/signin', user.signin);

export default router;
