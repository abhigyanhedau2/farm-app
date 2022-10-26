const express = require('express');

const useControllers = require('../controllers/user-controllers');

const router = express.Router();

const { signup, login } = useControllers;

// Signup / Create a new User
router.route('/signup').post(signup);

// Login User
router.route('/login').post(login);

module.exports = router;