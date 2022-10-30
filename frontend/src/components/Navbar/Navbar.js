import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {

    const path = useLocation().pathname;

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar__right}>
                <div className={classes.navbar__navlinks}>
                    <ul>
                        <li className={path === '/' ? classes.active : ''}><Link to='/'>Home</Link></li>
                        <li className={path === '/about' ? classes.active : ''}><Link to='/about'>About</Link></li>
                        <li className={path === '/contact' ? classes.active : ''}><Link to='/contact'>Contact</Link></li>
                    </ul>
                </div>
                <div className={classes.navbar__actions}>
                    <button>Login/Signup</button>
                    {/* <button>Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    <button>Logout</button> */}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;