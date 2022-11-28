import React from 'react';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../store/loader-actions';

import myorders from '../assets/purchases-bg.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import OrderCards from '../components/OrderCards/OrderCards';
import { showError } from '../store/feedback-actions';

const MyOrdersPage = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Birch Wood Ranch | Received Orders';
    }, []);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/orders`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                dispatch(hideLoader());

                if (data.status === 'success')
                    setOrders(data.data.orders);

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }
        };

        if (token)
            fetchOrders();

    }, [token, dispatch]);

    const userIds = orders.map(order => order.userId._id.toString());

    const uniqueUserIds = userIds.filter((x, i, a) => a.indexOf(x) === i);

    const customerOrders = uniqueUserIds.map(user => {

        let customerName = '';
        let customerAddress = '';
        let customerNumber = '';

        orders.every(order => {
            if (order.userId._id.toString() === user) {
                customerName = order.userId.name;
                customerAddress = order.userId.address;
                customerNumber = order.userId.number;
                return false;
            }

            return true;
        })

        return {
            customerId: user,
            customerName,
            customerAddress,
            customerNumber,
            customerOrder: orders.filter(order => order.userId._id.toString() === user)
        };
    });

    return (
        <Fragment>
            <CategoryHeader category="Received Orders" image={myorders} />
            <OrderCards orders={customerOrders} />
        </Fragment>
    )
};

export default MyOrdersPage;