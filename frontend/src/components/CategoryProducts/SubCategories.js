import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';

import ProductCard from './ProductCard';
import OneSideHR from '../UIElements/HR/OneSideHR';

import classes from './SubCategories.module.css';
import { useState } from 'react';
import { showError } from '../../store/feedback-actions';

const SubCategories = (props) => {

    const token = useSelector(state => state.auth.token);
    const [products] = useState(props.products);

    const dispatch = useDispatch();

    const getProductsForHeading = products.filter(product => product.subCategory === props.heading);

    const deleteProductHandler = async (id) => {

        dispatch(showLoader());

        try {

            await fetch(`https://farm-backend-production.up.railway.app/api/v1/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

        } catch (error) {

            dispatch(hideLoader());

            dispatch(showError(error.message));

        }

        dispatch(hideLoader());

        window.location.reload();
    };

    const productCards = getProductsForHeading.map(product => {
        return <ProductCard key={product._id} id={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} sellerId={product.sellerId} setLoaderState={props.setLoaderState} onDelete={deleteProductHandler.bind(null, product._id)} />
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