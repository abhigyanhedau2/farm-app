import React, { useState, useContext } from 'react';
import axios from 'axios';
import useInput from '../../hooks/use-input';

import { LoaderContext } from '../../store/loaderContext';
import { LoginContext } from '../../store/authContext';
import { FeedbackContext } from '../../store/feedbackContext';

import Card from '../UIElements/Card/Card';

import classes from './AddCategoryModal.module.css';

const textIsEmptyFn = (value) => {
    return value.toString().trim().length !== 0;
};

const AddCategoryModal = (props) => {

    const feedbackContext = useContext(FeedbackContext);
    const loginContext = useContext(LoginContext);
    const loaderContext = useContext(LoaderContext);

    const [file, setFile] = useState();

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler } = useInput(textIsEmptyFn);
    const { input: descriptionInput, inputIsValid: descriptionIsValid, inputIsTouched: descriptionIsTouched, inputChangeHandler: descriptionChangeHandler, inputTouchedHandler: descriptionTouchedHandler } = useInput(textIsEmptyFn);


    let nameClasses = undefined;
    let descriptionClasses = undefined;

    nameClasses = nameIsTouched ? nameIsValid ? classes.inputCorrect : classes.error : undefined;
    descriptionClasses = descriptionIsTouched ? descriptionIsValid ? classes.inputCorrect : classes.error : undefined;

    const closeModalHandler = () => {
        props.onClose(false);
    };

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    };

    const categoryFormSubmitHandler = async () => {

        loaderContext.showLoader();

        if (file === undefined) {
            loaderContext.hideLoader();
            feedbackContext.setShowError(true, 'Add a product image.');
        }

        else if (nameIsValid && descriptionIsValid) {

            const categoryName = nameInput;
            const categoryDescription = descriptionInput;

            const formData = new FormData();

            formData.append('category', categoryName);
            formData.append('description', categoryDescription);
            formData.append('image', file);

            try {

                await axios.post("https://birch-wood-farm.herokuapp.com/api/v1/category", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${loginContext.token}`
                        }
                    }).then((response) => {
                        if (response.data.status === 'success') {
                            loaderContext.hideLoader();
                            feedbackContext.setShowSuccess(true, 'Category added successfully. Refresh the page to fetch the category.');
                        } else {
                            loaderContext.hideLoader();
                            feedbackContext.setShowError(true, 'Some error occured while posting the category. Try again later.');
                        }
                    });

            } catch (error) {
                loaderContext.hideLoader();
                feedbackContext.setShowError(true, 'Some error occured while posting the category. Try again later.');
            }

        }

        else {
            loaderContext.hideLoader();
            feedbackContext.setShowError(true, 'Add complete details of the category.');
        }

    };

    const subCategoryFormSubmitHandler = async () => {

        if (nameIsValid) {

            const subCategory = nameInput;

            try {

                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/products/subCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginContext.token}`
                    },
                    body: JSON.stringify({
                        subCategory
                    })
                });

                if (!response.ok) {
                    loaderContext.hideLoader();
                    feedbackContext.setShowError(true, 'Some error occured while posting the category. Try again later.');
                }

                const data = await response.json();

                if (data.status === 'success') {
                    loaderContext.hideLoader();
                    feedbackContext.setShowSuccess(true, 'Sub Category added successfully. Refresh the page to fetch the sub category.');
                } else {
                    loaderContext.hideLoader();
                    feedbackContext.setShowError(true, 'Some error occured while posting the sub category. Try again later.');
                }

            } catch (error) {
                loaderContext.hideLoader();
                feedbackContext.setShowError(true, 'Some error occured while posting the sub category. Try again later.');
            }

        }

    };

    if (props.for === 'subcategory') {
        return (
            <div className={classes.AddCategoryModalWrapper}>
                <Card className={classes.AddCategoryCardWrapper}>
                    <div className={classes.crossIconWrapper} onClick={closeModalHandler}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="name">Enter the sub category to add</label>
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
                    <button onClick={() => { subCategoryFormSubmitHandler(); closeModalHandler(); }}>Add</button>
                </Card>
            </div>
        )
    }

    else if (props.for === 'category') {
        return (
            <div className={classes.AddCategoryModalWrapper}>
                <Card className={classes.AddCategoryCardWrapper}>
                    <div className={classes.crossIconWrapper} onClick={closeModalHandler}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="name">Enter the category to add</label>
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
                        <label htmlFor="description">Enter the category description</label>
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
                        <label htmlFor="image">Category Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={fileSelected}
                        />
                    </div>
                    <button onClick={() => { categoryFormSubmitHandler(); closeModalHandler(); }}>Add</button>
                </Card>
            </div>
        )
    }
}

export default AddCategoryModal;