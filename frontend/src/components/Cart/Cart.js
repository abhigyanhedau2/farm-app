import React from 'react';

import classes from './Cart.module.css';

const cart = {
    "_id": "63637e65f19a312d256556e2",
    "products": [
        {
            "product": "63636f58f19a312d2565568f",
            "totalProductsPrice": 800,
            "totalProductsQuantity": 2,
            "_id": "63637e65f19a312d256556e3"
        },
        {
            "product": "636370cbf19a312d256556a1",
            "totalProductsPrice": 1080,
            "totalProductsQuantity": 3,
            "_id": "63637e65f19a312d256556e4"
        },
        {
            "product": "6363700af19a312d2565569b",
            "totalProductsPrice": 400,
            "totalProductsQuantity": 2,
            "_id": "6363ebcbb5c80ccea4c23153"
        }
    ],
    "totalItems": 7,
    "cartPrice": 2280,
    "userId": "6360ec6c6b45d076ece99fb8",
    "__v": 0
};


// GET populated cart
const Cart = () => {

    const productsArr = cart.products;


    return (
        <div className={classes.cartPageWrapper}>
            <div className={classes.cartContainer}>
                <h1>Your Cart</h1>
                <div className={classes.cartProductsWrapper}>
                    <div className={classes.cartProductCard}>

                    </div>
                </div>
                <div className={classes.cartInfoWrapper}>
                    <p>Total Items : 24</p>
                    <p>Total Price : Rs. 2560</p>
                </div>
                <div className={classes.cartActionsWrapper}>
                    <button className={classes.btn + ' ' + classes.btnAlt}>Cancel</button>
                    <button className={classes.btn + ' ' + classes.btnAlt2}>Empty Cart</button>
                    <button className={classes.btn + ' ' + classes.btnMain}>Order</button>
                </div>
            </div>
        </div>
    )
};

export default Cart;