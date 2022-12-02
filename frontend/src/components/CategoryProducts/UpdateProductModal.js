import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import usePreInput from '../../hooks/use-pre-input';

import Loader from '../Loader/Loader';
import logoPic from '../../assets/logoPic.png';
import classes from './UpdateProductModal.module.css';
import AddCategoryModal from '../AddCategoryModal/AddCategoryModal';
import CenteredModal from '../UIElements/CenteredModal/CenteredModal';

const textIsEmptyFn = (value) => {
    return value.toString().trim().length !== 0;
};

const UpdateProductModal = (props) => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoryModalParams, setCategoryModalParams] = useState('');

    const [showLoader2, setShowLoader2] = useState(false);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [file, setFile] = useState();

    if (isLoggedIn && user && user.role !== 'seller') {
        dispatch(showError('Product can only be posted by seller. Try logging in with a seller account.'));
        navigate('/login', { replace: true });
    }

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler, setInput: setName, setInputIsValid: setNameIsValid } = usePreInput(textIsEmptyFn);
    const { input: priceInput, inputIsValid: priceIsValid, inputIsTouched: priceIsTouched, inputChangeHandler: priceChangeHandler, inputTouchedHandler: priceTouchedHandler, setInput: setPrice, setInputIsValid: setPriceIsValid } = usePreInput(textIsEmptyFn);
    const { input: quantityInput, inputIsValid: quantityIsValid, inputIsTouched: quantityIsTouched, inputChangeHandler: quantityChangeHandler, inputTouchedHandler: quantityTouchedHandler, setInput: setQuantity, setInputIsValid: setQuantityIsValid } = usePreInput(textIsEmptyFn);
    const { input: caloriesInput, inputIsValid: caloriesIsValid, inputIsTouched: caloriesIsTouched, inputChangeHandler: caloriesChangeHandler, inputTouchedHandler: caloriesTouchedHandler, setInput: setCalories, setInputIsValid: setCaloriesIsValid } = usePreInput(textIsEmptyFn);
    const { input: descriptionInput, inputIsValid: descriptionIsValid, inputIsTouched: descriptionIsTouched, inputChangeHandler: descriptionChangeHandler, inputTouchedHandler: descriptionTouchedHandler, setInput: setDescription, setInputIsValid: setDescriptionIsValid } = usePreInput(textIsEmptyFn);
    const { input: iconInput, inputIsValid: iconIsValid, inputIsTouched: iconIsTouched, inputChangeHandler: iconChangeHandler, inputTouchedHandler: iconTouchedHandler, setInput: setIcon, setInputIsValid: setIconIsValid } = usePreInput(textIsEmptyFn);
    const { input: ratingInput, inputIsValid: ratingIsValid, inputIsTouched: ratingIsTouched, inputChangeHandler: ratingChangeHandler, inputTouchedHandler: ratingTouchedHandler, setInput: setRating, setInputIsValid: setRatingIsValid } = usePreInput(textIsEmptyFn);

    const categoryRef = useRef();
    const subCategoryRef = useRef();
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

        const fetchProductDetails = async () => {

            dispatch(showLoader());
            setShowLoader2(true);
            
            const response = await fetch(`https://farm-backend-production.up.railway.app/api/v1/products/${props.id}`);
            
            const data = await response.json();
            
            setShowLoader2(false);
            dispatch(hideLoader());

            setName(data.data.product.name);
            setNameIsValid(true);

            setPrice(data.data.product.price);
            setPriceIsValid(true);

            setQuantity(data.data.product.quantityPerBox);
            setQuantityIsValid(true);

            setCalories(data.data.product.calories);
            setCaloriesIsValid(true);

            setDescription(data.data.product.description);
            setDescriptionIsValid(true);

            setIcon(data.data.product.icon);
            setIconIsValid(true);

            setRating(data.data.product.rating);
            setRatingIsValid(true);

            categoryRef.current.value = data.data.product.category;
            subCategoryRef.current.value = data.data.product.subCategory === null ? 'None' : data.data.product.subCategory;
            vegRef.current.value = data.data.product.veg;

        };

        fetchProductDetails();

        //eslint-disable-next-line
    }, [props.id]);

    // Fetch categories and subcategories
    useEffect(() => {

        const fetchCategories = async () => {
            dispatch(showLoader());
            const response = await fetch('https://farm-backend-production.up.railway.app/api/v1/category');
            const data = await response.json();
            const fetchedCategories = data.data.categories.map(category => category.category);
            dispatch(hideLoader());
            setCategories(fetchedCategories);
        };

        const fetchSubCategories = async () => {
            dispatch(showLoader());
            const response = await fetch('https://farm-backend-production.up.railway.app/api/v1/products/subCategory');
            const data = await response.json();
            const fetchedCategories = data.data.subcategories.map(subCategory => subCategory.subCategory);
            dispatch(hideLoader());
            setSubCategories(fetchedCategories);
        };

        fetchCategories();
        fetchSubCategories();

    }, [dispatch]);

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    };

    const addCategoryHandler = (val) => {
        setShowCategoryModal(true);
        setCategoryModalParams(val);
    };

    const addSubCategoryHandler = (val) => {
        setShowCategoryModal(true);
        setCategoryModalParams(val);
    };

    const formSubmitHandler = async () => {

        if (nameIsValid && priceIsValid && quantityIsValid && caloriesIsValid && descriptionIsValid && iconIsValid && ratingIsValid) {

            const productName = nameInput;
            const productCategory = categoryRef.current.value;
            const productSubCategory = subCategoryRef.current.value;
            const productPrice = priceInput;
            const quantityPerBox = quantityInput;
            const productCalories = caloriesInput;
            const productVeg = vegRef.current.value;
            const productDescription = descriptionInput;
            const productIcon = iconInput;
            const productRating = ratingInput;

            const formData = new FormData();

            formData.append('name', productName);
            formData.append('category', productCategory);
            productSubCategory === 'None' ? formData.append('subCategory', null) : formData.append('subCategory', productSubCategory);
            formData.append('price', productPrice);
            formData.append('quantityPerBox', quantityPerBox);
            formData.append('calories', productCalories);
            formData.append('veg', productVeg);
            formData.append('description', productDescription);
            formData.append('icon', productIcon);
            if (file)
                formData.append('image', file);
            formData.append('rating', productRating);

            try {

                setShowLoader2(true);

                await axios.patch(`https://farm-backend-production.up.railway.app/api/v1/products/${props.id}`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((response) => {
                        if (response.data.status === 'success') {
                            window.location.reload();
                            setShowLoader2(false);
                            dispatch(hideLoader());
                            dispatch(showSuccess('Product updated successfully. Refresh the page to see updated product.'));
                        } else {
                            setShowLoader2(false);
                            dispatch(hideLoader());
                            dispatch(showError('Some error occured while posting the product. Try again later.'));
                        }
                    });


            } catch (error) {
                setShowLoader2(false);
                // console.log(error);
                dispatch(showError('Some error occured while posting the product. Try again later.'));
            }

        }

        else {
            setShowLoader2(false);
            dispatch(showError('Add complete details of the product.'));
        }
    }

    const formSubmitHandler2 = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.completeModalWrapper}>
            {showCategoryModal && <AddCategoryModal onClose={setShowCategoryModal} for={categoryModalParams} />}
            {showLoader2 && <Loader />}
            {!showLoader2 && (
                <CenteredModal className={classes.postProductCardWrapper}>
                    <div className={classes.logoWrapper}>
                        <img src={logoPic} alt="Logo" />
                    </div>
                    <h1>Birch Wood Ranch</h1>
                    <p>Edit the fields that you want to update</p>
                    <form className={classes.postProductForm} onSubmit={formSubmitHandler2}>
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
                                    {categoryRef.current && <option value={categoryRef.current.value}>{categoryRef.current.value}</option>}
                                    {categories.map(category => {
                                        if (categoryRef.current && category !== categoryRef.current.value)
                                            return <option key={category} value={category}>{category}</option>
                                        else
                                            return null;
                                    })}
                                </select>
                                <button onClick={addCategoryHandler.bind(null, 'category')}>Add Category</button>
                            </div>
                            <div className={classes.inputWrapper}>
                                <label htmlFor="category">Sub Category</label>
                                <select ref={subCategoryRef} name="category" id="category">
                                    {subCategoryRef.current && <option value={subCategoryRef.current.value.trim().length === 0 ? null : subCategoryRef.current.value}>{subCategoryRef.current.value.trim().length === 0 ? 'None' : subCategoryRef.current.value}</option>}
                                    {subCategoryRef.current && subCategoryRef.current.value.trim().length !== 0 && <option value={null}>None</option>}
                                    {subCategories.map(subCategory => {
                                        if (subCategoryRef.current && subCategory !== subCategoryRef.current.value)
                                            return <option key={subCategory} value={subCategory}>{subCategory}</option>
                                        else
                                            return null;
                                    })}
                                </select>
                                <button onClick={addSubCategoryHandler.bind(null, 'subcategory')}>Add Sub Category</button>
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
                        </div>
                        <div className={classes.formRightSide}>
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
                    <div className={classes.formActions}>
                        <button onClick={formSubmitHandler}>Update Product</button>
                        <button className={classes.btnAlt} onClick={props.toggleModal}>Close</button>
                    </div>
                </CenteredModal>
            )
            }
        </div >
    )
};

export default UpdateProductModal;