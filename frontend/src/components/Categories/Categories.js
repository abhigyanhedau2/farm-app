import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { showError } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import Card from '../UIElements/Card/Card';
import HR from '../UIElements/HR/HR';

import classes from './Categories.module.css';

const Categories = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/category');
                const data = await response.json();
                setCategories(data.data.categories);
            } catch (error) {
                dispatch(showError(error.message));
            }
        };

        fetchCategories();

        //eslint-disable-next-line
    }, []);

    const redirectToCategoryHandler = (category) => {
        navigate(`/category/${category}`);
    };

    let categoryCards;

    if (categories.length !== 0) {
        dispatch(hideLoader());
        categoryCards = categories.map(category => {
            return (<Card key={category._id} className={classes.category__card}>
                <div className={classes.cardImg}>
                    <img src={category.image} alt="" />
                </div>
                <div className={classes.cardContent}>
                    <div className={classes.cardDetails}>
                        <h1>{category.category}</h1>
                        <p>{category.description}</p>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={redirectToCategoryHandler.bind(null, category.category)}>Shop &#8594;</button>
                    </div>
                </div>
            </Card>);
        })

        return (
            <div id='categories' className={classes.categories}>
                <h1 className={classes.heading__secondary}>Farm fresh products delivered to your home</h1>
                <HR color='#9ebeb3' />
                <div className={classes['category_cards-conatainer']}>
                    {categoryCards}
                </div>
            </div>
        )
    }

    else {
        dispatch(showLoader());
    }

};

export default Categories;