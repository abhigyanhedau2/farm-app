import React, { useContext } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { BackdropContext } from './store/backdropContext';

import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UIElements/Backdrop/Backdrop';
import BackdropWithLoader from './components/UIElements/BackdropWithLoader/BackdropWithLoader';
import Error from './components/Error/Error';
import SuccessModal from './components/SuccessModal/SuccessModal';
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

	const backdropWithLoaderContext = useContext(BackdropContext);

	return (
		<BrowserRouter>
			<div className="layout">
				<Error />
				<SuccessModal />
				<Backdrop show={backdropWithLoaderContext.showBackdrop} />
				<BackdropWithLoader show={backdropWithLoaderContext.showBackdropWithLoader} />
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