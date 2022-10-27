const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cart-model');

const getCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user._id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return res.status(204).json({
            status: 'success',
            data: null
        });

    res.send(200).json({
        status: 'success',
        data: {
            cart: cart
        }
    });
});

const updateCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user._id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return res.status(204).json({
            status: 'success',
            data: null
        });

    const { products, totalItems, cartPrice } = req.body;

    const updatedCart = await Cart.updateOne({ userId }, { products, totalItems, cartPrice }, { new: true });

    res.status(200).json({
        status: 'success',
        data: {
            cart: updatedCart
        }
    });

});

const deleteCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user._id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    await Cart.deleteOne({ userId });

    res.send(200).json({
        status: 'success',
        data: null
    });
});

module.exports = { getCart, updateCart, deleteCart };