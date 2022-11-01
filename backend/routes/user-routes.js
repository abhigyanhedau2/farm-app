const express = require('express');

const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

const { signup, login, getAllUsers, getUserFromUserId, postASeller, getMyDetails, updateMe, deleteMe, sendRecoveryMail, resetPassword } = userControllers;

// Signup / Create a new User
router.route('/signup').post(signup);

// Login User
router.route('/login').post(login);

// Forgort Password
router.route('/forgotPassword')
    .post(sendRecoveryMail);  // Send recovery mail 

router.route('/resetPassword')
    .post(resetPassword);    // Store updated password in the DB

// Protect all the routes below this middleware, to make sure user is logged in
router.use(protect);

// GET the list of all users, only accessible to admin
router.route('/')
    .get(restrictTo('admin'), getAllUsers)
    .patch(updateMe)    // UPDATE a user from user id
    .delete(deleteMe);  // DELETE a user from user id

router.route('/me')
    .get(getMyDetails);

router.route('/:userId')
    .get(restrictTo('admin'), getUserFromUserId); // GET a user from user id

// POST a seller    
router.route('/addSeller')
    .post(restrictTo('admin'), postASeller);

module.exports = router;