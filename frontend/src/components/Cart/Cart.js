import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';
import { showError, showSuccess } from '../../store/feedback-actions';
import { emptyCart, addToCartHandler, removeFromCartHandler, postCart } from '../../store/cart-actions';

import CartItem from './CartItem';
import emptyCartImage from '../../assets/empty-cart.png';
import classes from './Cart.module.css';

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const userId = useParams().userId;

    useEffect(() => {

        window.scrollTo(0, 0);

        const fetchCart = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch(`https://birch-wood-ranch-backend.vercel.app/api/v1/cart/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                dispatch(hideLoader());

                if (data.status === 'success') {
                    setProducts(data.data.cart.products);
                    setTotalItems(data.data.cart.totalItems);
                    setCartPrice(data.data.cart.cartPrice);
                }

            } catch (error) {

                dispatch(showError(error.message));

            }
        };

        if (user.role !== 'seller')
            fetchCart();

    }, [token, userId, dispatch, user]);

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

    const addItemToCartHandler = (userId, token, productId) => {


        let tempProductsArr = products;

        const productIdx = tempProductsArr.findIndex(item => item.product._id === productId);

        tempProductsArr[productIdx].totalProductsPrice = tempProductsArr[productIdx].totalProductsPrice + tempProductsArr[productIdx].product.price;
        tempProductsArr[productIdx].totalProductsQuantity = tempProductsArr[productIdx].totalProductsQuantity + 1;

        const newCartPrice = cartPrice + tempProductsArr[productIdx].product.price;

        setProducts(tempProductsArr);

        setTotalItems(prev => ++prev);
        setCartPrice(newCartPrice);

        dispatch(addToCartHandler(userId, token, productId));

    };

    const removeItemFromCartHandler = (userId, token, productId) => {


        let tempProductsArr = products;

        const productIdx = tempProductsArr.findIndex(item => item.product._id === productId);

        const newCartPrice = cartPrice - tempProductsArr[productIdx].product.price;

        // If the product quantity is 1, filter out that product from the productsArr
        if (tempProductsArr[productIdx].totalProductsQuantity === 1) {
            tempProductsArr = tempProductsArr.filter(item => item.product._id !== productId);
        }

        // The product quantity is greater than 1
        else {
            tempProductsArr[productIdx].totalProductsPrice = tempProductsArr[productIdx].totalProductsPrice - tempProductsArr[productIdx].product.price;
            tempProductsArr[productIdx].totalProductsQuantity = tempProductsArr[productIdx].totalProductsQuantity - 1;
        }

        setProducts(tempProductsArr);

        setTotalItems(prev => --prev);
        setCartPrice(newCartPrice);

        dispatch(removeFromCartHandler(userId, token, productId));

    };

    const emptyCartHandler = () => {
        dispatch(emptyCart(userId, token));
        navigate('/');
    };

    const cancelClickHandler = () => {
        navigate('/');
    };

    const orderClickHandler = () => {

        const orderedCart = {};

        orderedCart.products = cart.products;
        orderedCart.totalItems = cart.totalItems;
        orderedCart.cartPrice = cart.cartPrice;

        try {
            dispatch(postCart(userId, token, orderedCart));
            dispatch(emptyCart());
            dispatch(showSuccess("Order Placed! Thank you for shopping with us."));
            navigate('/');
        } catch (error) {
            dispatch(showError('Something went wrong!'));
        }

    };

    const cartItemCards = productsInfo.map(product => {
        return <CartItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            description={product.description}
            onAddToCart={addItemToCartHandler.bind(null, userId, token, product.id)}
            onRemoveFromCart={removeItemFromCartHandler.bind(null, userId, token, product.id)}
        />
    });

    const emptyCartMessage = (
        <div className={classes.emptyCardWrapper}>
            <img src={emptyCartImage} alt="Empty Cart" />
            <p>Add some items to the cart, so that we can deliver them to you in no time!</p>
        </div>
    );

    return (
        <div className={classes.cartPageWrapper}>
            <div className={classes.cartContainer}>
                <h1>Your Cart</h1>
                <div className={classes.cartProductsWrapper}>
                    {products.length === 0 ? emptyCartMessage : cartItemCards}
                </div>
                <div className={classes.cartInfoWrapper}>
                    <p>Total Items : {totalItems}</p>
                    <p>Total Price : Rs. {cartPrice}</p>
                </div>
                <div className={classes.cartActionsWrapper}>
                    <button className={classes.btn + ' ' + classes.btnAlt} disabled={products.length === 0} onClick={cancelClickHandler}>Cancel</button>
                    <button className={classes.btn + ' ' + classes.btnAlt2} disabled={products.length === 0} onClick={emptyCartHandler}>Empty Cart</button>
                    <button className={classes.btn + ' ' + classes.btnMain} disabled={products.length === 0} onClick={orderClickHandler}>Order</button>
                </div>
            </div>
        </div>
    )
};

export default Cart;