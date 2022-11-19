import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { showError } from '../../store/feedback-actions';

import purchasesTruckImg from '../../assets/purchases-truck.png';
import classes from './Purchases.module.css';
import PurchaseCard from './PurchaseCard';

const Purchases = () => {

    const [purchases, setPurchases] = useState([]);

    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);

    useEffect(() => {

        const fetchPurchases = async () => {

            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/purchases/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            // if (data.status !== 'success')
                // dispatch(console.log(data));

            setPurchases(data.data.purchases);
            // console.log(data.data.purchases);

        };

        fetchPurchases();

    }, [token, dispatch]);

    if (purchases.length === 0) {
        return (
            <div className={classes.noProductsWrapper}>
                <img src={purchasesTruckImg} alt="Empty box" />
                <p>You haven't ordered anything yet. ☹️</p>
                <p>Order some fresh farm products, so that we can deliver them to you in no time.</p>
            </div>
        );
    }

    const purchaseCards = purchases.map(purchase => {
        return <PurchaseCard
            products={purchase.products}
            orderedOn={purchase.orderedOn}
            totalItems={purchase.totalItems}
            cartPrice={purchase.cartPrice}
        />
    })

    return (
        <div className={classes.purchasesWrapper}>
            {purchaseCards}
        </div>
    )
};

export default Purchases;