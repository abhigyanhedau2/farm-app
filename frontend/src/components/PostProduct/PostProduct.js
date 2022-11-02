import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useInput from '../../hooks/use-input';

import { LoginContext } from '../../store/authContext';
import { FeedbackContext } from '../../store/feedbackContext';

import logoPic from '../../assets/logoPic.png';
import classes from './PostProduct.module.css';

/*
{
    "_id": "636110e97114309c5b3c6cd3",
    "name": "Sarcastic Fella",
    "email": "spam22010904@gmail.com",
    "address": "Pune",
    "number": 9876543210,
    "role": "customer",
    "__v": 0
}
*/

/*

c1 
name
category - list
price
quantityPerBox
calories

c2
veg
description
icon
image
rating

*/

const textIsEmptyFn = (value) => {
    return value.toString().trim().length !== 0;
};

const PostProduct = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState();

    const feedbackContext = useContext(FeedbackContext);
    const loginContext = useContext(LoginContext);

    if (loginContext.isLoggedIn && loginContext.user && loginContext.user.role !== 'seller') {
        feedbackContext.setShowError(true, 'Product can only be posted by seller. Try logging in with a seller account.');
        navigate('/login', { replace: true });
    }

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler } = useInput(textIsEmptyFn);
    const { input: priceInput, inputIsValid: priceIsValid, inputIsTouched: priceIsTouched, inputChangeHandler: priceChangeHandler, inputTouchedHandler: priceTouchedHandler } = useInput(textIsEmptyFn);
    const { input: quantityInput, inputIsValid: quantityIsValid, inputIsTouched: quantityIsTouched, inputChangeHandler: quantityChangeHandler, inputTouchedHandler: quantityTouchedHandler } = useInput(textIsEmptyFn);
    const { input: caloriesInput, inputIsValid: caloriesIsValid, inputIsTouched: caloriesIsTouched, inputChangeHandler: caloriesChangeHandler, inputTouchedHandler: caloriesTouchedHandler } = useInput(textIsEmptyFn);
    const { input: descriptionInput, inputIsValid: descriptionIsValid, inputIsTouched: descriptionIsTouched, inputChangeHandler: descriptionChangeHandler, inputTouchedHandler: descriptionTouchedHandler } = useInput(textIsEmptyFn);
    const { input: iconInput, inputIsValid: iconIsValid, inputIsTouched: iconIsTouched, inputChangeHandler: iconChangeHandler, inputTouchedHandler: iconTouchedHandler } = useInput(textIsEmptyFn);
    const { input: ratingInput, inputIsValid: ratingIsValid, inputIsTouched: ratingIsTouched, inputChangeHandler: ratingChangeHandler, inputTouchedHandler: ratingTouchedHandler } = useInput(textIsEmptyFn);

    const categoryRef = useRef();
    const vegRef = useRef();

    let nameClasses = undefined;
    let priceClasses = undefined;
    let quantityClasses = undefined;
    let caloriesClasses = undefined;
    let descriptionClasses = undefined;
    let iconClasses = undefined;
    let ratingClasses = undefined;

    nameClasses = nameIsTouched ? nameIsValid ? classes.inputCorrect : classes.error : undefined;
    priceClasses = priceIsTouched ? priceIsValid ? classes.inputCorrect : classes.error : undefined;
    quantityClasses = quantityIsTouched ? quantityIsValid ? classes.inputCorrect : classes.error : undefined;
    caloriesClasses = caloriesIsTouched ? caloriesIsValid ? classes.inputCorrect : classes.error : undefined;
    descriptionClasses = descriptionIsTouched ? descriptionIsValid ? classes.inputCorrect : classes.error : undefined;
    iconClasses = iconIsTouched ? iconIsValid ? classes.inputCorrect : classes.error : undefined;
    ratingClasses = ratingIsTouched ? ratingIsValid ? classes.inputCorrect : classes.error : undefined;

    useEffect(() => {

        const fecthCategories = async () => {

            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/category');
            const data = await response.json();
            const fetchedCategories = data.data.categories.map(category => category.category);
            setCategories(fetchedCategories);
        };

        fecthCategories();

    }, []);

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const formSubmitHandler = async () => {

        if (file === undefined)
            feedbackContext.setShowError(true, 'Add a product image.');

        const productName = nameInput;
        const productCategory = categoryRef.current.value;
        const productPrice = priceInput;
        const quantityPerBox = quantityInput;
        const productCalories = caloriesInput;
        const productVeg = vegRef.current.value;
        const productDescription = descriptionInput;
        const productIcon = iconInput;
        const productRating = ratingInput;

        if (nameIsValid && priceIsValid && quantityIsValid && caloriesIsValid && descriptionIsValid && iconIsValid && ratingIsValid) {

            const formData = new FormData();

            formData.append('name', productName);
            formData.append('category', productCategory);
            formData.append('price', productPrice);
            formData.append('quantityPerBox', quantityPerBox);
            formData.append('calories', productCalories);
            formData.append('veg', productVeg);
            formData.append('description', productDescription);
            formData.append('icon', productIcon);
            formData.append('image', file);
            formData.append('rating', productRating);

            try {

                await axios.post("http://localhost:5000/api/v1/products/", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${loginContext.token}`
                        }
                    }).then((response) => {
                        if (response.data.status === 'success') {
                            feedbackContext.setShowSuccess(true, 'Product posted successfully');
                        } else {
                            feedbackContext.setShowError(true, 'Some error occured while posting the product. Try again later.');
                        }
                    });


            } catch (error) {
                feedbackContext.setShowError(true, 'Some error occured while posting the product. Try again later.');
            }

        }

        else
            feedbackContext.setShowError(true, 'Add complete details of the product.');
    }

    return (
        <div className={classes.postProductPageWrapper}>
            <div className={classes.postProductCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.postProductForm} onSubmit={formSubmitHandler}>
                    <div className={classes.formLeftSide}>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="name">Product Name</label>
                            <input
                                className={nameClasses}
                                type="text"
                                name="name"
                                id="name"
                                value={nameInput}
                                onChange={nameChangeHandler}
                                onBlur={nameTouchedHandler}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="category">Category</label>
                            <select ref={categoryRef} name="category" id="category">
                                {categories.map(category => <option key={category} value={category}>{category}</option>)}
                            </select>
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="price">Price (Rs.)</label>
                            <input
                                className={priceClasses}
                                type="number"
                                name="price"
                                id="price"
                                value={priceInput}
                                onChange={priceChangeHandler}
                                onBlur={priceTouchedHandler}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="quantityPerBox">Quantity Per Box</label>
                            <input
                                className={quantityClasses}
                                type="text"
                                name="quantityPerBox"
                                id="quantityPerBox"
                                value={quantityInput}
                                onChange={quantityChangeHandler}
                                onBlur={quantityTouchedHandler}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="calories">Calories</label>
                            <input
                                className={caloriesClasses}
                                type="number"
                                name="calories"
                                id="calories"
                                value={caloriesInput}
                                onChange={caloriesChangeHandler}
                                onBlur={caloriesTouchedHandler}
                            />
                        </div>
                    </div>
                    <div className={classes.formRightSide}>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="veg">Veg/Non-Veg/Egg</label>
                            <select ref={vegRef} name="veg" id="veg">
                                <option value="veg">Veg</option>
                                <option value="nonveg">Non-Veg</option>
                                <option value="egg">Egg</option>
                            </select>
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="description">Product Description</label>
                            <input
                                className={descriptionClasses}
                                type="text"
                                name="description"
                                id="description"
                                value={descriptionInput}
                                onChange={descriptionChangeHandler}
                                onBlur={descriptionTouchedHandler}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="icon">Product Icon</label>
                            <input
                                className={iconClasses}
                                type="text"
                                name="icon"
                                id="icon"
                                value={iconInput}
                                onChange={iconChangeHandler}
                                onBlur={iconTouchedHandler}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="image">Product Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={fileSelected}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <label htmlFor="rating">Rating</label>
                            <input
                                className={ratingClasses}
                                type="number"
                                name="rating"
                                id="rating"
                                min="1"
                                max="5"
                                value={ratingInput}
                                onChange={ratingChangeHandler}
                                onBlur={ratingTouchedHandler}
                            />
                        </div>
                    </div>
                </form>
                <button onClick={formSubmitHandler}>Add Product</button>
            </div>
        </div>
    )
};

export default PostProduct;