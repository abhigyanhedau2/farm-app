import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { showError } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import emptyBoxImg from '../../assets/box.png';

import ProductCard from './ProductCard';
import SubCategories from './SubCategories';

import classes from './CategoryProducts.module.css';
import Loader from '../Loader/Loader';

const CategoryProducts = (props) => {

    const isLoading = useSelector(state => state.productsLoading.isLoading);

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            dispatch(showLoader());

            try {
                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/products/category/${props.category}`);
                const data = await response.json();
                setProducts(data.products);
                dispatch(hideLoader());
            } catch (error) {
                dispatch(hideLoader());
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
                    {/* {loaderIsVisible && <Loader />} */}
                    {isLoading && <Loader />}
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
                    {/* {loaderIsVisible && <Loader />} */}
                    {isLoading && <Loader />}
                    {productCards}
                </div>
            )
        }
    }

    else {
        return (
            <div className={classes.noProductsWrapper}>
                <img src={emptyBoxImg} alt="Empty box" />
                <p>No Products to show. ☹️</p>
                <p>Come back later.</p>
            </div>
        );
    }
};

export default CategoryProducts;