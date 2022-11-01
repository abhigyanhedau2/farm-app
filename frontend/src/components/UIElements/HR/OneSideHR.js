import React from 'react';
import './OneSideHR.module.css';

const HRLine = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: `${props.width}` }}>
            <hr style={{ '--lineColor': props.color }} />
        </div>
    )
};

export default HRLine;