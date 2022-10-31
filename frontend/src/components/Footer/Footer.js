import React from 'react';
import { Link } from 'react-router-dom';

import HR from '../UIElements/HR/HR';

import classes from './Footer.module.css';

const Footer = () => {
    return (
        <div className={classes.footerWrapper}>
            <div className={classes.footerNavigation}>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>
            <HR color="white" />
            <p>Birch Wood Ranch by Abhigyan Hedau</p>
        </div>
    )
};

export default Footer;