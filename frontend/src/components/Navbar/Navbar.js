import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {

    const [invertNav, setInvertNav] = useState(false);

    const path = useLocation().pathname;

    const handleScroll = () => {
        window.scrollY > 700 ? setInvertNav(true) : setInvertNav(false);
    }

    window.addEventListener('scroll', handleScroll, true);

    let ulClass = invertNav ? classes.blackList :  classes.whiteList;

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar__right}>
                <div className={classes.navbar__navlinks}>
                    <ul className={ulClass}>
                        <li className={path === '/' ? classes.active : ''}><Link to='/'>Home</Link></li>
                        <li className={path === '/about' ? classes.active : ''}><Link to='/about'>About</Link></li>
                        <li className={path === '/contact' ? classes.active : ''}><Link to='/contact'>Contact</Link></li>
                        {/* <li className={(path === '/' ? classes.active : '') + liClasses}><Link to='/'>Home</Link></li>
                        <li className={(path === '/about' ? classes.active : '') + liClasses}><Link to='/about'>About</Link></li>
                        <li className={(path === '/contact' ? classes.active : '') + liClasses}><Link to='/contact'>Contact</Link></li> */}
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