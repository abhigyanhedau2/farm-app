import React from 'react';
import classes from './HR.module.css';

const HRLine = (props) => {
    return (
        <div className={classes.singleHR} style={{ display: 'flex', justifyContent: 'center' }}>
            <hr style={{ '--lineColor': props.color }} />
        </div>
    )
};

export default HRLine;