import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { showError } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = () => {

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);

    const token = useSelector(state => state.auth.token);

    const userId = useParams().userId;

    useEffect(() => {

        const fetchCart = async () => {

            dispatch(showLoader());

            const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/cart/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            dispatch(hideLoader());

            setProducts(data.data.cart.products);
            setTotalItems(data.data.cart.totalItems);
            setCartPrice(data.data.cart.cartPrice);
        };

        fetchCart();

    }, [token, userId]);

    const productsArr = products;

    const productsInfo = productsArr.map(product => {
        return {
            id: product.product._id,
            name: product.product.name,
            image: product.product.image,
            description: product.product.description,
            quantity: product.totalProductsQuantity,
            price: product.totalProductsPrice
        };
    });

    const cartItemCards = productsInfo.map(product => {
        return <CartItem name={product.name} image={product.image} price={product.price} quantity
            ={product.quantity} description={product.description} />
    });

    return (
        <div className={classes.cartPageWrapper}>
            <div className={classes.cartContainer}>
                <h1>Your Cart</h1>
                <div className={classes.cartProductsWrapper}>
                    <div className={classes.cartProductCard}>
                        {cartItemCards}
                    </div>
                </div>
                <div className={classes.cartInfoWrapper}>
                    <p>Total Items : {totalItems}</p>
                    <p>Total Price : Rs. {cartPrice}</p>
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