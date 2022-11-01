import React, { useCallback, useEffect, useState } from 'react';

import HR from '../UIElements/HR/HR';

import classes from './CategoryHeader.module.css';

const CategoryHeader = (props) => {

    return (
        <div className={classes.categoryHeaderWrapper} style={{ backgroundImage: `linear-gradient(40deg, rgba(2,0,36,0.1) 0%, rgba(9,9,121,0.1) 100%, rgba(0,212,255,1) 100%), url(${props.image})` }}>
            <h1>{props.category}</h1>
            <HR color="white" />
        </div>
    )
};

export default CategoryHeader;