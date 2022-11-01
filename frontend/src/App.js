import React, { useContext } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UIElements/Backdrop/Backdrop';
import BackdropWithLoader from './components/UIElements/BackdropWithLoader/BackdropWithLoader';
import Home from './pages/Home';
import Category from './pages/Category';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { BackdropContext } from './store/backdropContext';

const App = () => {

	const backdropWithLoaderContext = useContext(BackdropContext);

	return (
		<BrowserRouter>
			<Backdrop show={backdropWithLoaderContext.showBackdrop} />
			<BackdropWithLoader show={backdropWithLoaderContext.showBackdropWithLoader} />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/category/:category" element={<Category />} />
			</Routes>
			<Footer />
		</BrowserRouter >
	)
};

export default App;