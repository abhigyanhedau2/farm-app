import React from 'react';

import classes from './PurchaseCardItem.module.css';

const PurchaseCardItem = (props) => {
    return (
        <div className={classes.purchaseCardItemWrapper}>
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

export default PurchaseCardItem;