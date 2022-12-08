import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import { showLoader, hideLoader } from '../store/loader-actions';

import manageProductsImage from '../assets/manageProducts.jpg';
import ProductCard from '../components/CategoryProducts/ProductCard';

import emptyBoxImg from '../assets/box.png';

import classes from '../components/CategoryProducts/CategoryProducts.module.css';
import { showError } from '../store/feedback-actions';

const ManageProducts = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Birch Wood Ranch | Manage Products';
    }, []);

    useEffect(() => {

        const fetchSellerProducts = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch(`https://birch-wood-ranch-backend.vercel.app/api/v1/products/seller/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                dispatch(hideLoader());

                setProducts(data.data.products);

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }

        };

        if (user)
            fetchSellerProducts();

    }, [user, token, dispatch]);

    const deleteProductHandler = async (id) => {

        try {
            dispatch(showLoader());

            await fetch(`https://birch-wood-ranch-backend.vercel.app/api/v1/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            dispatch(hideLoader());

            window.location.reload();
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showError(error.message));
        }

    };

    const productCards = products.map(product => {
        return <ProductCard key={product._id} id={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} sellerId={product.sellerId} onDelete={deleteProductHandler.bind(null, product._id)} />
    });

    if (products.length === 0) {
        return (
            <div>
                <CategoryHeader category="Manage Products" image={manageProductsImage} />
                <div className={classes.noProductsWrapper}>
                    <img src={emptyBoxImg} alt="Empty box" />
                    <p>You haven't posted any products yet. ☹️</p>
                    <p>Post some products and manage them here.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <CategoryHeader category="Manage Products" image={manageProductsImage} />
            <div className={classes.categoryProductsWrapper}>
                {productCards}
            </div>
        </div>
    )
};

export default ManageProducts;