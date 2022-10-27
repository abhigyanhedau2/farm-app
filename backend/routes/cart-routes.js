const express = require('express');
const protect = require('../middlewares/protect');
const cartControllers = require('../controllers/cart-controllers');

const router = express.Router();

const { getCart, updateCart, deleteCart } = cartControllers;

router.use(protect);

router.route('/:userId')
    .get(getCart)   // GET the cart
    .patch(updateCart)  // UPDATE the cart if an item is added or removed
    .delete(deleteCart);    // DELETE the cart

module.exports = router;