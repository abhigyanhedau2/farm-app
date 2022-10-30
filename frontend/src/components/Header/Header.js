import React from 'react';

import logo from '../../assets/logo.png';

import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.header__logo}>
                <img src={logo} alt="" />
            </div>
            <div className={classes['header__main-content']}>
                <h1 className={classes['heading-primary']}>
                    <span className={classes['heading-primary--main']}>Birch Wood Ranch</span>
                    <span className={classes['heading-primary--sub']}>Farm Produce & More</span>
                </h1>
                <button><a href="#categories">Explore</a></button>
            </div>
        </div>
    )
};

export default Header;