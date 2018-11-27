import express from 'express';
import {
  createRedFlag, getRedFlags, getSpecificRedFlag, updateLocation, updateComment, deleteRedFlag,
} from '../controllers/red_flags';

const router = express.Router();

router.post('/api/v1/red-flags', createRedFlag);
router.get('/api/v1/red-flags', getRedFlags);
router.get('/api/v1/red-flags/:id', getSpecificRedFlag);
router.patch('/api/v1/red-flags/:id/location', updateLocation);
router.patch('/api/v1/red-flags/:id/comment', updateComment);
router.delete('/api/v1/red-flags/:id', deleteRedFlag);

module.exports = router;
