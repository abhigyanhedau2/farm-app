const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user-model');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Signup / Create a new User
const signup = catchAsync(async (req, res, next) => {

    // Get the required fields from req.body
    const { name, email, password, address, number } = req.body;

    // Convert 'number' to number for validation
    const stringedNumber = number + '';

    // Perform the respective validations
    if (validator.isEmpty(name) ||
        !validator.isEmail(email) ||
        !validator.isLength(password, { min: 6 }) ||
        validator.isEmpty(address) ||
        !validator.isLength(stringedNumber, { min: 10, max: 10 })
    )
        return next(new AppError(400, 'Please add complete and correct details for sign up'));

    // Check if a user with the email exists previously
    const existingUser = await User.findOne({ email });

    // If the user already exists with the email, return an error
    if (existingUser)
        return next(new AppError(400, 'User already exists. Try logging in.'));

    // Hash the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        number
    });

    // Create JWT token and sign it
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
            token
        }
    });

});

// Login User
const login = catchAsync(async (req, res, next) => {

    // Get the required fields from req.body
    const { email, password } = req.body;

    // Check if provided email and password are valid or not
    if (!validator.isEmail(email) ||
        !validator.isLength(password, { min: 6 }))
        return next(new AppError(400, 'Please add complete and correct details for login.'));

    // Get the user from DB along with password, we need to explicitly select password
    // because we set select: false for password
    const user = await User.findOne({ email }).select('+password');

    // If the user does not exists, send error
    if (!user)
        return next(new AppError(400, 'Invalid credentials. Wrong email or password.'));

    // Check if the password is correct or not
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect send error
    if (!passwordIsCorrect)
        return next(new AppError(400, 'Invalid credentials. Wrong email or password.'));

    // Create JWT token and sign it
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    res.status(201).json({
        status: 'success',
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                number: user.number,
                address: user.address
            },
            token
        }
    });
});

// GET the list of all users - Only accessible to admin
const getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(204).json({
            status: 'success',
            results: 0,
            data: {
                users: []
            }
        });
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users
        }
    });

});

// GET a user from user id
const getUserFromUserId = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user)
        return next(new AppError(404, `No user found with user id ${userId}`));

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });

});

const postASeller = catchAsync(async (req, res, next) => {

    // Get the required fields from req.body
    const { name, email, password, address, number, role } = req.body;

    // Convert 'number' to number for validation
    const stringedNumber = number + '';

    // Perform the respective validations
    if (validator.isEmpty(name) ||
        !validator.isEmail(email) ||
        !validator.isLength(password, { min: 6 }) ||
        validator.isEmpty(address) ||
        !validator.isLength(stringedNumber, { min: 10, max: 10 })
    )
        return next(new AppError(400, 'Please add complete and correct details for sign up'));

    // Check if a user with the email exists previously
    const existingUser = await User.findOne({ email });

    // If the user already exists with the email, return an error
    if (existingUser)
        return next(new AppError(400, 'Seller already exists. Try logging in.'));

    // Hash the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 12);

    const newSeller = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        number,
        role
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newSeller
        }
    });

});

// GET user details
const getMyDetails = catchAsync(async (req, res, next) => {

    console.log('reached');

    const userId = req.user._id;

    // Fetch the user from DB
    const user = await User.findById(userId);

    if (!user)
        return next(new AppError(404, `No user found with user id ${userId}`));

    const { name, address, number } = user;

    res.status(200).json({
        status: 'success',
        data: {
            name,
            address,
            number
        }
    });

});

// UPDATE a user from user id
const updateMe = catchAsync(async (req, res, next) => {

    const userId = req.user._id;

    // Fetch the user from DB
    const user = await User.findById(userId);

    // If no user is found, throw an error
    if (!user)
        return next(new AppError(404, `No user found with user id ${userId}`));

    // Extract required fields from body
    const { name, address, number } = req.body;

    // Validate the fields
    if (name !== undefined) {
        if (validator.isEmpty(name))
            return next(new AppError(400, 'Please add a name for updation'));
    }

    if (address !== undefined) {
        if (validator.isEmpty(address))
            return next(new AppError(400, 'Please add an address for updation'));
    }

    if (number !== undefined) {

        const stringedNumber = number + '';

        if (!validator.isLength(stringedNumber, { min: 10, max: 10 }))
            return next(new AppError(400, 'Please add a 10 digit number for updation'));
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, { name, address, number }, { new: true });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });

});

const deleteMe = catchAsync(async (req, res, next) => {

    const userId = req.user._id;

    // Fetch the user from DB
    const user = await User.findById(userId);

    // If no user is found, throw an error
    if (!user)
        return next(new AppError(404, `No user found with user id ${userId}`));

    await User.findByIdAndDelete(userId);

    res.status(204).json({
        status: 'success',
        data: null
    })

});

module.exports = { signup, login, getAllUsers, getUserFromUserId, postASeller, getMyDetails, updateMe, deleteMe };