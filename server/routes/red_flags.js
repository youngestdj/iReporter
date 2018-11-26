import express from 'express';
import { createRedFlag, getRedFlags, getSpecificRedFlag } from '../controllers/red_flags';

const router = express.Router();

router.post('/api/v1/red-flags', createRedFlag);
router.get('/api/v1/red-flags', getRedFlags);
router.get('/api/v1/red-flags/:id', getSpecificRedFlag);

module.exports = router;
