const express = require('express');
const controller = require('../../server/controllers/red_flags.js');

const router = express.Router();

// Home page route.
router.post('/api/v1/red-flags', controller.createRedFlag);

module.exports = router;
