import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartHandler, removeFromCartHandler, triggerCartButtonAnimation } from '../../store/cart-actions';

import Card from '../UIElements/Card/Card';

import veg from '../../assets/veg.png';
import nonveg from '../../assets/nonveg.png';
import egg from '../../assets/egg.png';

import UpdateProductModal from './UpdateProductModal';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);


    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [currProductQuantity, setCurrProductQuantity] = useState(0);

    const cart = useSelector(state => state.cart);
    const cartProductsArr = cart.products;

    useEffect(() => {

        const itemExists = cartProductsArr.findIndex(product => product.product === props.id);

        if (itemExists >= 0)
            setCurrProductQuantity(cartProductsArr[itemExists].totalProductsQuantity);

    }, [cartProductsArr, props.id]);

    const getCategoryImage = (category) => {
        switch (category) {
            case 'veg':
                return veg;
            case 'nonveg':
                return nonveg;
            case 'egg':
                return egg;
            default:
                return '';
        }
    };

    const getRating = (rating) => {
        const ratingNum = rating * 1;
        const ratingArr = [];

        for (let i = 1; i <= 5; i++) {
            i <= ratingNum ? ratingArr.push(1) : ratingArr.push(0);
        }

        const ratingStarArr = ratingArr.map(item => {
            if (item)
                return <i key={Math.random()} className="fa-solid fa-star"></i>
            else
                return <i key={Math.random()} className="fa-regular fa-star"></i>
        });

        return ratingStarArr;
    };

    const incrementQuantityHandler = () => {

        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        dispatch(triggerCartButtonAnimation());

        setCurrProductQuantity(prev => ++prev);

        dispatch(addToCartHandler(user._id, token, props.id));

    };

    const decrementQuantityHandler = () => {

        setCurrProductQuantity(prev => --prev);

        dispatch(removeFromCartHandler(user._id, token, props.id));

    };

    const toggleModalHandler = () => {
        setShowModal(prev => !prev);
    };

    const addBtnConditions = (
        (isLoggedIn && user && user.role === 'customer') ||
        !(isLoggedIn && user && user.role === 'seller') ||
        !isLoggedIn
    );

    const editAndUpdateBtnConditions = isLoggedIn && user && user.role === 'seller' && user._id === props.sellerId;

    const updateProductHandler = () => {

        setShowModal(true);

    };

    const deleteProductHandler = () => {

        props.onDelete();

    };

    return (
        <Fragment>
            {/* {<UpdateProductModal toggleModal={toggleModalHandler} />} */}
            {showModal && <UpdateProductModal toggleModal={toggleModalHandler} id={props.id} />}
            <div className={classes.productCardOuterWrapper}>
                <div className={classes.vegInfo}>
                    <img src={getCategoryImage(props.veg)} alt={props.veg} />
                </div>
                <Card className={classes.productCardWrapper}>
                    <div className={classes.productImage}>
                        <img src={props.image} alt={props.name} />
                    </div>
                    <div className={classes.productDetails}>
                        <div className={classes.productAbout}>
                            <h1>{props.name}</h1>
                            <p>{props.description}</p>
                        </div>
                        <div className={classes.productPackInfo}>
                            <div className={classes.productQuantityInfo}>
                                <p>{props.quantityPerBox} {props.icon} per 📦</p>
                                <p>🔥 {props.calories} cal</p>
                            </div>
                            <p>Rating: {getRating(props.rating)}</p>
                        </div>
                        <div className={classes.productActions}>
                            <p>Price: Rs. {props.price}</p>
                            {addBtnConditions && (<div className={classes.productQuantityWrapper}>
                                {!currProductQuantity && <button className={classes.addBtn} onClick={incrementQuantityHandler}>Add +</button>}
                                {currProductQuantity > 0 && (<Fragment>
                                    <button className={classes.quantityBtn} onClick={decrementQuantityHandler}>-</button>
                                    <p>{currProductQuantity}</p>
                                    <button className={classes.quantityBtn} onClick={incrementQuantityHandler}>+</button>
                                </Fragment>)}
                            </div>)}
                            {editAndUpdateBtnConditions && (<div className={classes.productQuantityWrapper}>
                                <button className={classes.sellerActionBtn} onClick={updateProductHandler}><i className="fa-solid fa-pen-to-square"></i></button>
                                <button className={classes.sellerActionBtn} onClick={deleteProductHandler}><i className="fa-solid fa-trash"></i></button>
                            </div>)}
                        </div>
                    </div>
                </Card>
            </div>
        </Fragment>
    )
};

export default ProductCard;