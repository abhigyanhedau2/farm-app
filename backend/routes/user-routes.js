const express = require('express');

const useControllers = require('../controllers/user-controllers');

const router = express.Router();

const { signup, login } = useControllers;

// Signup / Create a new User
router.route('/signup').post( signup);

module.exports = router;