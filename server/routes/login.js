import express from 'express';
import Login from '../controllers/login';

const router = express.Router();


router.post('/', Login.logUserIn);
export default router;
