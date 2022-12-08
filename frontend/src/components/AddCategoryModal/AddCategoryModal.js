import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import useInput from '../../hooks/use-input';

import Card from '../UIElements/Card/Card';

import classes from './AddCategoryModal.module.css';

const textIsEmptyFn = (value) => {
    return value.toString().trim().length !== 0;
};

const AddCategoryModal = (props) => {

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

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

        if (file === undefined) {
            dispatch(showError('Add a category image.'));
        }

        else if (nameIsValid && descriptionIsValid) {

            const categoryName = nameInput;
            const categoryDescription = descriptionInput;

            const formData = new FormData();

            formData.append('category', categoryName);
            formData.append('description', categoryDescription);
            formData.append('image', file);

            try {

                dispatch(showLoader());

                await axios.post("https://birch-wood-ranch-backend.vercel.app/api/v1/category", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((response) => {
                        if (response.data.status === 'success') {
                            dispatch(hideLoader());
                            dispatch(showSuccess('Category added successfully. Refresh the page to fetch the category.'))
                        } else {
                            dispatch(hideLoader());
                            dispatch(showError('Some error occured while posting the category. Try again later.'));
                        }
                    });

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError('Some error occured while posting the category. Try again later.'));
            }

        }

        else {
            dispatch(hideLoader());
            dispatch(showError('Add complete details of the category.'));
        }

    };

    const subCategoryFormSubmitHandler = async () => {

        if (nameIsValid) {

            const subCategory = nameInput;

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-ranch-backend.vercel.app/api/v1/products/subCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        subCategory
                    })
                });

                if (!response.ok) {
                    dispatch(hideLoader());
                    dispatch(showError('Some error occured while posting the category. Try again later.'));
                }

                const data = await response.json();

                if (data.status === 'success') {
                    dispatch(hideLoader());
                    dispatch(showSuccess('Sub Category added successfully. Refresh the page to fetch the sub category.'));
                } else {
                    dispatch(hideLoader());
                    dispatch(showError('Some error occured while posting the sub category. Try again later.'));
                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError('Some error occured while posting the sub category. Try again later.'));
            }

            dispatch(hideLoader());

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