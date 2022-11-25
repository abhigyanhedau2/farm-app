import React from 'react';

import classes from './OrderCardItem.module.css';

const OrderCardItem = (props) => {

    return (
        <div className={classes.orderCardItemWrapper}>
            <div className={classes.leftSideItemsWrapper}>
                <img src={props.image} alt={props.name} />
                <p>{props.name} x {props.quantity}</p>
            </div>
            <div className={classes.rightSideItemsWrapper}>
                <h3>Rs. {props.price}</h3>
            </div>
        </div>
    )
};

export default OrderCardItem;