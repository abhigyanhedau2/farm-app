const express = require('express');

const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

const useControllers = require('../controllers/user-controllers');

const router = express.Router();

const { signup, login, getAllUsers, getUserFromUserId } = useControllers;

// Signup / Create a new User
router.route('/signup').post(signup);

// Login User
router.route('/login').post(login);

// Protect all the routes below this middleware, to make sure user is logged in
router.use(protect);

// GET the list of all users, only accessible to admin
router.route('/').get(restrictTo('admin'), getAllUsers);

router.route('/:userId')
    .get(restrictTo('admin'), getUserFromUserId); // GET a user from user id

module.exports = router;