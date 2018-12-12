import express from 'express';
import RedFlag from '../controllers/red_flags';

const router = express.Router();

router.post('/', RedFlag.createRedFlag);
router.get('/', RedFlag.getRedFlags);
router.get('/:id', RedFlag.getSpecificRedFlag);
router.patch('/:id/location', RedFlag.updateLocation);
router.patch('/:id/comment', RedFlag.updateComment);
router.delete('/:id', RedFlag.deleteRedFlag);

module.exports = router;
