import express from 'express';
import { createRedFlag, getRedFlags } from '../controllers/red_flags';

const router = express.Router();

router.post('/api/v1/red-flags', createRedFlag);
router.get('/api/v1/red-flags', getRedFlags);

module.exports = router;
