import express from 'express';
import logUserIn from '../controllers/login';

const router = express.Router();

router.post('/', logUserIn);
export default router;
