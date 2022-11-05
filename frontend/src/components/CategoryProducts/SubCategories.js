import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';
import { addToCartHandler } from '../../store/cart-actions';


import ProductCard from './ProductCard';
import OneSideHR from '../UIElements/HR/OneSideHR';

import classes from './SubCategories.module.css';

const SubCategories = (props) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const incrementQuantityHandler = (userId, token, productId) => {

        dispatch(showLoader());

        dispatch(addToCartHandler(user._id, token, props.id));

        dispatch(hideLoader());

    };

    const getProductsForHeading = props.products.filter(product => product.subCategory === props.heading);

    const productCards = getProductsForHeading.map(product => {
        return <ProductCard key={product._id} id={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} onAddProduct={incrementQuantityHandler.bind(null, user._id, token, props.id)} />
    });

    return (
        <div className={classes.subCategoryProductsWrapper}>
            <h1>{props.heading}</h1>
            <OneSideHR color="#34c078" width='80vw' />
            <div className={classes.productCardsWrapper}>
                {productCards}
            </div>
        </div>
    )
};

export default SubCategories;