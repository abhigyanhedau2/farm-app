import React, { useEffect } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { fetchToken } from './store/auth-actions';

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

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchToken());
	}, [dispatch])

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
						<Route path="/category/:category" element={<Category />} />
					</Routes>
				</main>
			</div>
			<Footer />
		</BrowserRouter >
	)
};

export default App;