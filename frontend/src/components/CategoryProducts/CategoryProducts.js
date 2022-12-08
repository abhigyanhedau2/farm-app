import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import emptyBoxImg from '../../assets/box.png';

import ProductCard from './ProductCard';
import SubCategories from './SubCategories';

import classes from './CategoryProducts.module.css';
import Loader from '../Loader/Loader';

const CategoryProducts = (props) => {

    const isLoading = useSelector(state => state.productsLoading.isLoading);

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch(`https://birch-wood-ranch-backend.vercel.app/api/v1/products/category/${props.category}`);

                const data = await response.json();

                dispatch(hideLoader());

                setProducts(data.products);

            } catch (error) {

                dispatch(hideLoader());
                dispatch(showError(error.message));

            }
        };

        fetchProducts();

        //eslint-disable-next-line
    }, [props.category]);

    const deleteProductHandler = async (id) => {

        dispatch(showLoader());

        const response = await fetch(`https://birch-wood-ranch-backend.vercel.app/api/v1/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            dispatch(showSuccess('Product deleted successfully'));
            dispatch(hideLoader());
            window.location.reload();
        }
        
        dispatch(hideLoader());

    };

    if (products.length !== 0) {

        let hasSubCategory = false;

        products.forEach(product => {
            if (product.subCategory && product.subCategory !== "null") {
                hasSubCategory = true;
            }
        })

        if (hasSubCategory) {

            const getHeadings = products.map(item => item.subCategory);
            let getFilteredHeadings = [];
            getFilteredHeadings = getHeadings.filter(e => !(getFilteredHeadings[e] = e in getFilteredHeadings));
            getFilteredHeadings.sort();

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
                return <ProductCard key={product._id} id={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} sellerId={product.sellerId} onDelete={deleteProductHandler.bind(null, product._id)} />
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