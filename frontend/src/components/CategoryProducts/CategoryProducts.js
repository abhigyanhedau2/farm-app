import React, { useEffect, useState, useContext } from 'react';

import ProductCard from './ProductCard';
import SubCategories from './SubCategories';

import { BackdropContext } from '../../store/backdropContext';
import { FeedbackContext } from '../../store/feedbackContext';

import classes from './CategoryProducts.module.css';

const CategoryProducts = (props) => {

    const backdropContext = useContext(BackdropContext);
    const feedbackContext = useContext(FeedbackContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/products/category/${props.category}`);
                const data = await response.json();
                setProducts(data.products);
                backdropContext.showBackdropWithLoaderHandler(false);
            } catch (error) {
                backdropContext.showBackdropWithLoaderHandler(false);
                feedbackContext.setShowError(true, error.message);
            }
        };

        backdropContext.showBackdropWithLoaderHandler(true);
        
        fetchProducts();

        //eslint-disable-next-line
    }, [props.category]);

    if (products.length !== 0) {
        backdropContext.showBackdropWithLoaderHandler(false);
        if (products[0].subCategory) {

            const getHeadings = products.map(item => item.subCategory);
            let getFilteredHeadings = [];
            getFilteredHeadings = getHeadings.filter(e => !(getFilteredHeadings[e] = e in getFilteredHeadings));

            return (
                <div className={classes.subCategoryProductsWrapper}>
                    {getFilteredHeadings.map(heading => {
                        return <SubCategories key={heading} products={products} heading={heading} />
                    })}
                </div>
            )
        }

        else {

            const productCards = products.map(product => {
                return <ProductCard key={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} />
            });

            return (
                <div className={classes.categoryProductsWrapper}>
                    {productCards}
                </div>
            )
        }
    }
};

export default CategoryProducts;