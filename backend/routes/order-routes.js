const express = require('express');

const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// Routes for seller to see the orders placed and delete the orders once completed
router.use(protect);

module.exports = router;