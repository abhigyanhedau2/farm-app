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
    });

    const toIST = (timeString) => {

        let [hour, mins, secs] = timeString.split(':');

        hour = +hour;
        mins = +mins;
        secs = +secs;

        if (mins >= 30)
            hour++;

        hour = (hour + 5) % 24;
        mins = (mins + 30) % 60;

        return `${hour < 10 ? '0' + hour : hour}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    const dateTimeStr = props.orderedOn.split('T').join(' ').slice(0, 19);
    let [date, time] = dateTimeStr.split(' ');
    time = toIST(time);

    return (
        <Card className={classes.purchaseCardWrapper}>
            <div className={classes.cardHeading}>
                <p>Ordered On: {date} {time}</p>
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