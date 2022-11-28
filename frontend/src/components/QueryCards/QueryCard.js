import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/loader-actions';
import { showError, showSuccess } from '../../store/feedback-actions';

import Card from '../UIElements/Card/Card';
import classes from './QueryCard.module.css';

const QueryCard = (props) => {

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const deleteClickHandler = async () => {

        try {

            dispatch(showLoader());

            await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/users/allqueries/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            window.location.reload();

            dispatch(hideLoader());

        } catch (error) {
            dispatch(hideLoader());
            dispatch(showError(error.message));
        }
    };

    return (
        <Card className={classes.queryCardWrapper}>
            <div className={classes.custInfo}>
                <p><b>Name: </b>{props.name}</p>
                <p><b>EMail: </b>{props.email}</p>
                <p><b>Query: </b>{props.query}</p>
            </div>
            <div className={classes.actions}>
                <button onClick={deleteClickHandler}><i className="fa-solid fa-trash"></i></button>
            </div>
        </Card>
    )
};

export default QueryCard;