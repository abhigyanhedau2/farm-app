const express = require('express');
const protect = require('../middlewares/protect');
const cartControllers = require('../controllers/cart-controllers');

const router = express.Router();

const { getCart, updateCart, deleteCart } = cartControllers;

router.use(protect);

router.route('/')
    .get(getCart)
    .patch(updateCart)
    .delete(deleteCart);

module.exports = router;