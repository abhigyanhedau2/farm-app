import React, { useEffect, useState } from 'react';

import Card from '../UIElements/Card/Card';
import HR from '../UIElements/HR/HR';

import classes from './Categories.module.css';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/category');
            const data = await response.json();
            setCategories(data.data.categories);
        };

        fetchCategories();

    }, []);

    const categoryCards = categories.map(category => {
        return (<Card key={category._id} className={classes.category__card}>
            <div className={classes.cardImg}>
                <img src={category.image} alt="" />
            </div>
            <div className={classes.cardContent}>
                <h1>{category.category}</h1>
                <p>{category.description}</p>
                <div className={classes.actions}>
                    <button>Shop &#8594;</button>
                </div>
            </div>
        </Card>);
    })

    return (
        <div id='categories' className={classes.categories}>
            <h1 className={classes.heading__secondary}>Farm fresh products delivered to your home</h1>
            <HR color='#9ebeb3' />
            <div className={classes['category_cards-conatainer-resize'] + ' ' + classes['category_cards-conatainer']}>
                {categoryCards}
            </div>
        </div>
    )
};

export default Categories;