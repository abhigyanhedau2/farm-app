const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cart-model');

const getCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user.id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return res.status(204).json({
            status: 'success',
            data: null
        });

    res.status(200).json({
        status: 'success',
        data: {
            cart
        }
    });

});

const updateCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user.id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    const { products, totalItems, cartPrice } = req.body;

    const cart = await Cart.findOne({ userId });

    // If no cart is found, create one
    if (!cart) {

        const newCart = await Cart.create({ products, totalItems, cartPrice, userId });

        return res.status(200).json({
            status: 'success',
            data: {
                cart: newCart
            }
        });

    }

    await Cart.updateOne({ userId }, { products, totalItems, cartPrice }, { new: true });

    const updatedCart = await Cart.findOne({ userId });

    res.status(200).json({
        status: 'success',
        data: {
            cart: updatedCart
        }
    });

});

const deleteCart = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;

    if (req.user.id !== userId)
        return next(new AppError(403, 'Forbidden. You do not have access.'));

    await Cart.deleteOne({ userId });

    res.send(204).json({
        status: 'success',
        data: null
    });
});

module.exports = { getCart, updateCart, deleteCart };