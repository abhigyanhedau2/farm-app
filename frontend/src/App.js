import React, { useEffect, Suspense } from 'react';
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
import Footer from './components/Footer/Footer';

import './App.css';
// import Category from './pages/Category';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';
// import PostProductPage from './pages/PostProductPage';
// import ContactPage from './pages/ContactPage';
// import CartPage from './pages/CartPage';
// import PurchasePage from './pages/PurchasePage';
// import UserInfoPage from './pages/UserInfoPage';
// import AddSellerPage from './pages/AddSellerPage';
// import ManageProducts from './pages/ManageProducts';
// import MyOrdersPage from './pages/MyOrdersPage';
// import QueriesPage from './pages/QueriesPage';

// Add Lazy Loading
const Category = React.lazy(() => import('./pages/Category'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
// const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const PostProductPage = React.lazy(() => import('./pages/PostProductPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const PurchasePage = React.lazy(() => import('./pages/PurchasePage'));
const UserInfoPage = React.lazy(() => import('./pages/UserInfoPage'));
const AddSellerPage = React.lazy(() => import('./pages/AddSellerPage'));
const ManageProducts = React.lazy(() => import('./pages/ManageProducts'));
const MyOrdersPage = React.lazy(() => import('./pages/MyOrdersPage'));
const QueriesPage = React.lazy(() => import('./pages/QueriesPage'));

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
					<Suspense fallback={<Loader />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
							{/* <Route path="/forgotPassword" element={<ForgotPasswordPage />} /> */}
							{/* <Route path="/resetPassword" element={<ResetPasswordPage />} /> */}
							<Route path="/contact" element={<ContactPage />} />
							<Route path="/postProduct" element={<PostProductPage />} />
							<Route path="/manageProducts" element={<ManageProducts />} />
							<Route path="/purchases" element={<PurchasePage />} />
							<Route path="/receivedorders" element={<MyOrdersPage />} />
							<Route path="/customerqueries" element={<QueriesPage />} />
							<Route path="/me" element={<UserInfoPage />} />
							<Route path="/addSeller" element={<AddSellerPage />} />
							<Route path="/cart/:userId" element={<CartPage />} />
							<Route path="/category/:category" element={<Category />} />
						</Routes>
					</Suspense>
				</main>
			</div>
			<Footer />
		</BrowserRouter >
	)
};

export default App;