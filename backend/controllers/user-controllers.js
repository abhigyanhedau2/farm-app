const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user-model');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signup = catchAsync(async (req, res, next) => {

    const { name, email, password, address, number } = req.body;

    const stringedNumber = number + '';

    if (validator.isEmpty(name) ||
        !validator.isEmail(email) ||
        !validator.isLength(password, { min: 6 }) ||
        validator.isEmpty(address) ||
        !validator.isLength(stringedNumber, { min: 10, max: 10 })
    )
        return next(new AppError(400, 'Please add complete and correct details for sign up'));

    // Check if a user with the email exists previously
    const existingUser = await User.findOne({ email });

    if (existingUser)
        return next(new AppError(400, 'User already exists. Try loggin in.'));

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

const login = (req, res, next) => { };

module.exports = { signup, login };