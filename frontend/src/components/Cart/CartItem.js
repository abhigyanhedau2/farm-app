import React from 'react';

import classes from './CartItem.module.css';

const CartItem = (props) => {
    return (
        <div className={classes.cartItemWrapper}>
            <div className={classes.leftSideCartItem}>
                <div className={classes.cartItemImage}>
                    <img src={props.image} alt={props.name} />
                </div>
                <div className={classes.cartItemDetails}>
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
                </div>
            </div>
            <div className={classes.rightSideCardItem}>
                <div className={classes.cartItemPrice}>
                    <p>Rs. {props.price}</p>
                </div>
                <div className={classes.cartItemActions}>
                    <button>-</button>
                    <p>{props.quantity}</p>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
};

export default CartItem;