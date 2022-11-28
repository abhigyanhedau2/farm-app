import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';

import OrderCardItem from './OrderCardItem';

import Card from '../UIElements/Card/Card';

import classes from './OrderCard.module.css';
import { showError } from '../../store/feedback-actions';

const PurchaseCard = (props) => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);

    const filteredProducts = props.products.map(product => {
        return {
            id: product._id,
            image: product.product.image,
            name: product.product.name,
            price: product.product.price,
            quantity: product.totalProductsQuantity
        };
    });

    const orderCardItems = filteredProducts.map(item => {

        return <OrderCardItem
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
        />
    });

    const sendDeleteRequest = async (orderId) => {

        try {

            dispatch(showLoader());

            const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            dispatch(hideLoader());

            if (data.status !== 'success')
                console.log(data);

        } catch (error) {
            dispatch(hideLoader());
            dispatch(showError(error.message));
        }

    };

    const orderCompletedHandler = async () => {

        let counter = 0;
        const len = props.products.length;

        props.products.forEach(async order => {
            await sendDeleteRequest(order._id);
            counter += 1;
            if (counter === len)
                window.location.reload();
        });

    };

    return (
        <Card className={classes.orderCardWrapper}>
            <div className={classes.cardHeading}>
                <h1>Customer Details: </h1>
                <p><b>Name: </b>{props.customerName}</p>
                <p><b>Address: </b>{props.customerAddress}</p>
                <p><b>Contact: </b>{props.customerNumber}</p>
            </div>
            <div className={classes.orderedProductsListWrapper}>
                {orderCardItems}
            </div>
            <div className={classes.orderInfoWrapper}>
                <p><span>Total Items : </span>{props.totalItems}</p>
                <p><span>Total Price : </span> Rs. {props.cartPrice}</p>
            </div>
            <div className={classes.orderActions}>
                <button onClick={orderCompletedHandler}>Done</button>
            </div>
        </Card>
    )
};

export default PurchaseCard;