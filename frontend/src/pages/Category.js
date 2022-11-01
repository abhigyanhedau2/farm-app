import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CategoryProducts from '../components/CategoryProducts/CategoryProducts';

const Category = () => {

    const requestedCategory = useParams().category;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/category`);
            const data = await response.json();
            setCategories(data.data.categories);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        document.title = `Birch Wood Ranch | ${requestedCategory}`;
    }, [requestedCategory]);

    if (categories.length !== 0) {
        const requiredCategory = categories.filter(category => category.category === requestedCategory);
        return (
            <div>
                <CategoryHeader category={requestedCategory} image={requiredCategory[0].image} />
                <CategoryProducts category={requestedCategory} />
            </div>
        )
    }
};

export default Category;