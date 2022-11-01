import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UIElements/Backdrop/Backdrop';
import Home from './pages/Home';
import Category from './pages/Category';

const App = () => {

	return (
		<BrowserRouter>
			<Backdrop />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:category" element={<Category />} />
			</Routes>
			<Footer />
		</BrowserRouter >
	)
};

export default App;