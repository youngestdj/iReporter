const express = require('express');
const controller = require('../controllers/signup.js');

const router = express.Router();

router.post('/', controller.signUserUp);
module.exports = router;