import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { showError } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import ProductCard from './ProductCard';
import SubCategories from './SubCategories';

import classes from './CategoryProducts.module.css';
import Loader from '../Loader/Loader';

const CategoryProducts = (props) => {

    const loaderIsVisible = useSelector(state => state.loader.loaderIsVisible);

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/products/category/${props.category}`);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                dispatch(showError(error.message));
            }
        };

        fetchProducts();

        //eslint-disable-next-line
    }, [props.category]);

    if (products.length !== 0) {

        let hasSubCategory = false;

        products.forEach(product => {
            if (product.subCategory) {
                hasSubCategory = true;
            }
        })

        if (hasSubCategory) {

            const getHeadings = products.map(item => item.subCategory);
            let getFilteredHeadings = [];
            getFilteredHeadings = getHeadings.filter(e => !(getFilteredHeadings[e] = e in getFilteredHeadings));

            dispatch(hideLoader());
            return (
                <div className={classes.subCategoryProductsWrapper}>
                    {loaderIsVisible && <Loader />}
                    {getFilteredHeadings.map(heading => {
                        return <SubCategories key={heading} products={products} heading={heading} />
                    })}
                </div>
            )
        }

        else {
            const productCards = products.map(product => {
                return <ProductCard key={product._id} id={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} />
            });

            dispatch(hideLoader());
            return (
                <div className={classes.categoryProductsWrapper}>
                    {loaderIsVisible && <Loader />}
                    {productCards}
                </div>
            )
        }
    }

    else {
        dispatch(showLoader());
    }
};

export default CategoryProducts;