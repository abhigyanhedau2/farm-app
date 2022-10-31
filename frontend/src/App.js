import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UIElements/Backdrop/Backdrop';
import Home from './pages/Home';

const App = () => {

	

	return (
		<BrowserRouter>
			<Backdrop />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter >
	)
};

export default App;