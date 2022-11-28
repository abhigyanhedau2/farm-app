import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';
import { showError } from '../../store/feedback-actions';

import stickyNotesImg from '../../assets/sticky-notes.png';
import QueryCard from './QueryCard';

import classes from './QueryCards.module.css';

const QueryCards = () => {

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const [queries, setQueries] = useState([]);

    useEffect(() => {

        const fetchQueries = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/allqueries', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                dispatch(hideLoader());

                setQueries(data.data.queries);

            } catch (error) {

                dispatch(hideLoader());
                dispatch(showError(error.message));
                console.log(error);

            }
        };

        if (token)
            fetchQueries();

    }, [dispatch, token]);

    if (queries.length === 0) {
        return (
            <div className={classes.noProductsWrapper}>
                <img src={stickyNotesImg} alt="Empty box" />
                <p>No queries have been posted yet.</p>
            </div>
        );
    }

    const queryCards = queries.map(query => <QueryCard key={query._id} id={query._id} name={query.name} email={query.email} query={query.query} />)

    return (
        <div className={classes.queriesWrapper}>
            {queryCards}
        </div>
    )
};

export default QueryCards;