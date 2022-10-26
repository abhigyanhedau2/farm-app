const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user-model');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

    if (!user)
        return next(new AppError(400, 'Invalid credentials. Wrong email or password.'));

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

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

module.exports = { signup, login };