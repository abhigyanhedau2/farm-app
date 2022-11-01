import React from 'react';
import classes from './OneSideHR.module.css';

const HRLine = (props) => {
    return (
        <div className={classes.oneSideHR} style={{ display: 'flex', justifyContent: 'center', width: `${props.width}` }}>
            <hr style={{ '--lineColor': props.color }} />
        </div>
    )
};

export default HRLine;