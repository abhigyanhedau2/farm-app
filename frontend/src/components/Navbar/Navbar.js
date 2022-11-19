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
        window.scrollY > 450 ? setInvertNav(true) : setInvertNav(false);
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

    const logoutClickHander = () => {
        dispatch(logout());
    };

    const profileButton = (
        <div className={classes.dropdown}>
            <button className={classes.dropbtn}><i className="fa-regular fa-circle-user"></i>Profile</button>
            <div className={classes.dropdownContent}>
                <Link to="/me">My Info</Link>
                <Link to="/" onClick={logoutClickHander}>Logout</Link>
            </div>
        </div>
    );

    return (
        <Fragment>
            <nav className={classes.navbar}>
                {showMenu && (<ul className={classes.responsiveUlList}>
                    <li onClick={showMenuHandler}><Link to='/'>Home</Link></li>
                    <li onClick={showMenuHandler}><Link to='/contact'>Contact</Link></li>
                    {isLoggedIn && user && user.role === 'seller' && <li onClick={showMenuHandler}><Link to='/postProduct'>Add Product</Link></li>}
                    {isLoggedIn && user && user.role === 'customer' && <li onClick={showMenuHandler}><Link to='/purchases'>My Orders</Link></li>}
                    {isLoggedIn && user && <li onClick={showMenuHandler}><Link to='/me'>My Info</Link></li>}
                    {isLoggedIn && user && <li onClick={showMenuHandler}><Link to='/' onClick={logoutClickHander}>Logout</Link></li>}
                </ul>)}
                <div className={classes.navbar__right}>
                    <div className={classes.navbar__navlinks}>
                        <ul className={ulClass}>
                            <li className={path === '/' ? classes.active : ''}><Link to='/'>Home</Link></li>
                            <li className={path === '/contact' ? classes.active : ''}><Link to='/contact'>Contact</Link></li>
                            {isLoggedIn && user && user.role === 'seller' && <li className={path === '/postProduct' ? classes.active : ''}><Link to='/postProduct'>Add Product</Link></li>}
                            {isLoggedIn && user && user.role === 'customer' && <li className={path === '/purchases' ? classes.active : ''}><Link to='/purchases'>My Orders</Link></li>}
                        </ul>
                    </div>
                    <div className={classes.navbar__actions}>
                        {!isLoggedIn && <button onClick={loginClickHandler}>Login/Signup</button>}
                        {isLoggedIn && <Fragment>
                            {isLoggedIn && user && user.role === 'customer' && <button className={cartChanged ? classes.cartButton : ''} onClick={() => navigate(`/cart/${user._id}`)}>Cart ({totalCartItems}) <i className="fa-solid fa-cart-shopping"></i></button>}
                            {isLoggedIn && user && user.role === 'admin' && <button className={cartChanged ? classes.cartButton : ''} onClick={() => navigate(`/addSeller`)}>Add Seller</button>}
                            {/* <button onClick={() => { dispatch(logout()) }}>Logout</button> */}
                            {profileButton}
                        </Fragment>}
                        <button className={classes.responsiveMenuBtn} onClick={showMenuHandler}><i className="fa-solid fa-bars"></i></button>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
};

export default Navbar;