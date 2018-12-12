import express from 'express';
import Signup from '../controllers/signup';

const router = express.Router();

router.post('/', Signup.saveUserToDb);
export default router;
