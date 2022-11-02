import React, { Fragment, useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { BackdropContext } from '../../store/backdropContext';
import { LoginContext } from '../../store/authContext';

import classes from './Navbar.module.css';

const Navbar = () => {

    const navigate = useNavigate();

    const backdropContext = useContext(BackdropContext);
    const loginContext = useContext(LoginContext);

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
        !showMenu ? backdropContext.showBackdrop() :  backdropContext.hideBackdrop();
    };

    const loginClickHandler = () => {
        navigate('/login');
    }

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
                        {!loginContext.isLoggedIn && <button onClick={loginClickHandler}>Login/Signup</button>}
                        {loginContext.isLoggedIn && <Fragment>
                            <button>Cart (5) <i className="fa-solid fa-cart-shopping"></i></button>
                            <button onClick={loginContext.onLogout}>Logout</button>
                        </Fragment>}
                        <button className={classes.responsiveMenuBtn} onClick={showMenuHandler}><i className="fa-solid fa-bars"></i></button>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
};

export default Navbar;