import React from 'react';
import { useState } from 'react';
import OrderCard from './OrderCard';
import purchasesTruckImg from '../../assets/purchases-truck.png';
import classes from './OrderCards.module.css';
import { useEffect } from 'react';

const OrderCards = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(props.orders);
    }, [props.orders]);

    if (orders.length === 0) {
        return (
            <div className={classes.noProductsWrapper}>
                <img src={purchasesTruckImg} alt="Empty box" />
                <p>You haven't received any orders yet. ☹️</p>
                <p>Come back later.</p>
            </div>
        );
    }

    const orderCards = orders.map(order => {

        let totalItems = 0;
        let totalPrice = 0;

        order.customerOrder.forEach(product => {
            totalItems += product.totalProductsQuantity;
            totalPrice += product.totalProductsPrice;
        })

        return <OrderCard
            key={order.customerId}
            id={order.customerId}
            orderId={order._id}
            products={order.customerOrder}
            totalItems={totalItems}
            cartPrice={totalPrice}
            customerName={order.customerName}
            customerAddress={order.customerAddress}
            customerNumber={order.customerNumber}
        />
    });

    return (
        <div className={classes.ordersWrapper}>
            {orderCards}
        </div>
    )
};

export default OrderCards;