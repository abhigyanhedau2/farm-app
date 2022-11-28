import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CategoryProducts from '../components/CategoryProducts/CategoryProducts';
import Loader from '../components/Loader/Loader';
import { showError } from '../store/feedback-actions';
import { showLoader, hideLoader } from '../store/loader-actions';

const Category = () => {

    const dispatch = useDispatch();

    const requestedCategory = useParams().category;

    const loaderIsVisible = useSelector(state => state.loader.loaderIsVisible);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {

            try {
                dispatch(showLoader());
                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/category`);
                const data = await response.json();
                dispatch(hideLoader());
                setCategories(data.data.categories);
            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }

        };
        fetchCategories();
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | ${requestedCategory}`;
    }, [requestedCategory]);

    if (categories.length !== 0) {
        const requiredCategory = categories.filter(category => category.category === requestedCategory);
        return (
            <div>
                {loaderIsVisible && <Loader />}
                <CategoryHeader category={requestedCategory} image={requiredCategory[0].image} />
                <CategoryProducts category={requestedCategory} />
            </div>
        )
    }
};

export default Category;