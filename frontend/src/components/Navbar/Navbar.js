import React, { Fragment, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { hideBackdrop, showBackdrop } from '../../store/backdrop-actions';
import { logout } from '../../store/auth-actions';

import classes from './Navbar.module.css';

const Navbar = () => {

    // const cart = useSelector(state => state.cart.totalItems);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const totalCartItems = useSelector(state => state.cart.totalItems);
    const cartChanged = useSelector(state => state.cart.changed);
    const dispatch = useDispatch();

    const navigate = useNavigate();

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
        !showMenu ? dispatch(showBackdrop()) : dispatch(hideBackdrop());
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
                            {user && user.role === 'seller' && <li className={path === '/postProduct' ? classes.active : ''}><Link to='/postProduct'>Add Product</Link></li>}
                        </ul>
                    </div>
                    <div className={classes.navbar__actions}>
                        {!isLoggedIn && <button onClick={loginClickHandler}>Login/Signup</button>}
                        {isLoggedIn && <Fragment>
                            <button className={cartChanged ? classes.cartButton : ''} onClick={() => navigate(`/cart/${user._id}`)}>Cart ({totalCartItems}) <i className="fa-solid fa-cart-shopping"></i></button>
                            <button onClick={() => { dispatch(logout()) }}>Logout</button>
                        </Fragment>}
                        <button className={classes.responsiveMenuBtn} onClick={showMenuHandler}><i className="fa-solid fa-bars"></i></button>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
};

export default Navbar;