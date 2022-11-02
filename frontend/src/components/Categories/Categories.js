import React, { useEffect, useState, useContext } from 'react';

import { BackdropContext } from '../../store/backdropContext';
import { FeedbackContext } from '../../store/feedbackContext';

import Card from '../UIElements/Card/Card';
import HR from '../UIElements/HR/HR';

import classes from './Categories.module.css';

const Categories = () => {

    const backdropContext = useContext(BackdropContext);
    const feedbackContext = useContext(FeedbackContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        backdropContext.showBackdropWithLoaderHandler(true);

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/category');
                const data = await response.json();
                backdropContext.showBackdropWithLoaderHandler(false);
                setCategories(data.data.categories);
            } catch (error) {
                backdropContext.showBackdropWithLoaderHandler(false);
                feedbackContext.setShowError(true, error.message);
            }
        };

        fetchCategories();

        //eslint-disable-next-line
    }, []);

    const redirectToCategoryHandler = (category) => {
        window.open(`/category/${category}`, '_blank')
    };

    let categoryCards;

    if (categories.length !== 0) {
        backdropContext.showBackdropWithLoaderHandler(false);
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
        <p>No categories to load. Come back later.</p>
    }

};

export default Categories;