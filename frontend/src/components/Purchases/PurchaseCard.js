import React from 'react';

import PurchaseCardItem from './PurchaseCardItem';

import Card from '../UIElements/Card/Card';

import classes from './PurchaseCard.module.css';

const PurchaseCard = (props) => {

    const purchaseCardItems = props.products.map(item => {
        return <PurchaseCardItem
            image={item.product.image}
            name={item.product.name}
            quantity={item.totalProductsQuantity}
            price={item.totalProductsPrice}
        />
    })

    return (
        <Card className={classes.purchaseCardWrapper}>
            <div className={classes.cardHeading}>
                <p>Ordered On: {props.orderedOn.split('T').join(' ').slice(0, 19)}</p>
            </div>
            <div className={classes.purchasedProductsListWrapper}>
                {purchaseCardItems}
            </div>
            <div className={classes.purchaseInfoWrapper}>
                <p><span>Total Items : </span>{props.totalItems}</p>
                <p><span>Total Price : </span> Rs. {props.cartPrice}</p>
            </div>
        </Card>
    )
};

export default PurchaseCard;