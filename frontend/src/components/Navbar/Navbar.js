import React, { Fragment, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { BackdropContext } from '../../store/backdropContext';

import classes from './Navbar.module.css';

const Navbar = () => {

    const backdropContext = useContext(BackdropContext);

    const [invertNav, setInvertNav] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const path = useLocation().pathname;

    const handleScroll = () => {
        window.scrollY > 700 ? setInvertNav(true) : setInvertNav(false);
    }

    window.addEventListener('scroll', handleScroll, true);

    let ulClass = invertNav ? classes.blackList : classes.whiteList;

    const showMenuHandler = () => {
        setShowMenu(prev => !prev);
        backdropContext.setShowBackdrop(!showMenu);
    };

    return (
        <Fragment>
            <nav className={classes.navbar}>
                {showMenu && (<ul className={classes.responsiveUlList}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>)}
                <div className={classes.navbar__right}>
                    <div className={classes.navbar__navlinks}>
                        <ul className={ulClass}>
                            <li className={path === '/' ? classes.active : ''}><Link to='/'>Home</Link></li>
                            <li className={path === '/contact' ? classes.active : ''}><Link to='/contact'>Contact</Link></li>
                        </ul>
                    </div>
                    <div className={classes.navbar__actions}>
                        {/* <button>Login/Signup</button> */}
                        <button>Cart (5) <i className="fa-solid fa-cart-shopping"></i></button>
                        <button>Logout</button>
                        <button className={classes.responsiveMenuBtn} onClick={showMenuHandler}><i className="fa-solid fa-bars"></i></button>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
};

export default Navbar;