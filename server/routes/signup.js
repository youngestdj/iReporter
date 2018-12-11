import express from 'express';
import signUp from '../controllers/signup';

const router = express.Router();

router.post('/', signUp);
export default router;
