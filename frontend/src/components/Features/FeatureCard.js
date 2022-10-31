import React from 'react';

import classes from './FeatureCard.module.css';

const FeatureCard = (props) => {
    return (
        <div className={classes.featureCard}>
            <img src={props.image} alt="Healthy Living" />
            <p>{props.description}</p>
        </div>
    )
};

export default FeatureCard;