import React, { useEffect } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { fetchToken } from './store/auth-actions';
import { fetchCart } from './store/cart-actions';

import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UIElements/Backdrop/Backdrop';
import Error from './components/Error/Error';
import SuccessModal from './components/SuccessModal/SuccessModal';
import Loader from './components/Loader/Loader';
import Home from './pages/Home';
import Category from './pages/Category';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PostProductPage from './pages/PostProductPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer/Footer';

import './App.css';
import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';
import UserInfoPage from './pages/UserInfoPage';
import AddSellerPage from './pages/AddSellerPage';
import ManageProducts from './pages/ManageProducts';

const App = () => {

	// const cart = useSelector(state => state.cart);

	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const user = useSelector(state => state.auth.user);

	useEffect(() => {

		dispatch(fetchToken());

		if (user && user.role !== 'seller') {
			dispatch(fetchCart(user._id, token));
		}

		// eslint-disable-next-line
	}, [dispatch, token]);


	const errorIsVisible = useSelector(state => state.feedback.errorIsVisible);
	const successIsVisible = useSelector(state => state.feedback.successIsVisible);

	const loaderIsVisible = useSelector(state => state.loader.loaderIsVisible)
	const backdropIsVisible = useSelector(state => state.backdrop.backdropIsVisible)

	return (
		<BrowserRouter>
			<div className="layout">
				{loaderIsVisible && <Loader />}
				{backdropIsVisible && <Backdrop />}
				{errorIsVisible && <Error />}
				{successIsVisible && <SuccessModal />}
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
						<Route path="/resetPassword" element={<ResetPasswordPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/postProduct" element={<PostProductPage />} />
						<Route path="/manageProducts" element={<ManageProducts />} />
						<Route path="/purchases" element={<PurchasePage />} />
						<Route path="/me" element={<UserInfoPage />} />
						<Route path="/addSeller" element={<AddSellerPage />} />
						{<Route path="/cart/:userId" element={<CartPage />} />}
						<Route path="/category/:category" element={<Category />} />
					</Routes>
				</main>
			</div>
			<Footer />
		</BrowserRouter >
	)
};

export default App;