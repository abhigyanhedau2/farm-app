import React from 'react';

import ProductCard from './ProductCard';
import OneSideHR from '../UIElements/HR/OneSideHR';

import classes from './SubCategories.module.css';

const SubCategories = (props) => {

    const getProductsForHeading = props.products.filter(product => product.subCategory === props.heading);

    const productCards = getProductsForHeading.map(product => {
        return <ProductCard key={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} />
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