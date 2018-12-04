const express = require('express');
const controller = require('../controllers/red_flags.js');

const router = express.Router();

router.post('/', controller.createRedFlag);
router.get('/', controller.getRedFlags);
router.get('/:id', controller.getSpecificRedFlag);
router.patch('/:id/location', controller.updateLocation);
router.patch('/:id/comment', controller.updateComment);
router.delete('/:id', controller.deleteRedFlag);

module.exports = router;
