import React, { Fragment, useState } from 'react';

import Card from '../UIElements/Card/Card';

import veg from '../../assets/veg.png';
import nonveg from '../../assets/nonveg.png';
import egg from '../../assets/egg.png';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {

    const [quantity, setQuantity] = useState(0);

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
        setQuantity(prev => prev + 1);
    };

    const decrementQuantityHandler = () => {
        setQuantity(prev => prev === 0 ? prev : prev - 1);
    };

    return (
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
                        <div className={classes.productQuantityWrapper}>
                            {!quantity && <button className={classes.addBtn} onClick={incrementQuantityHandler}>Add +</button>}
                            {quantity > 0 && (<Fragment>
                                <button className={classes.quantityBtn} onClick={decrementQuantityHandler}>-</button>
                                <p>{quantity}</p>
                                <button className={classes.quantityBtn} onClick={incrementQuantityHandler}>+</button>
                            </Fragment>)}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default ProductCard;