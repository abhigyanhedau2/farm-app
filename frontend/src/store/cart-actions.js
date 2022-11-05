import { cartActions } from "./cart-slice";
import { showError } from './feedback-actions';

const fetchCartRequest = async (userId, token) => {

    const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/cart/unpopulated/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (data.status === 'error') {
        showError(data.message);
        return;
    }

    return data.data.cart;

};

export const emptyCart = () => {

    return dispatch => {

        dispatch(cartActions.emptyCart());

    };

};

export const fetchCart = (userId, token) => {

    return async dispatch => {

        try {

            let payload = {};

            const cart = await fetchCartRequest(userId, token);

            if (cart === undefined) {
                payload.products = [];
                payload.totalItems = 0;
                payload.cartPrice = 0;
                payload.userId = null;
            }

            else {
                payload.products = cart.products;
                payload.totalItems = cart.totalItems;
                payload.cartPrice = cart.cartPrice;
                payload.userId = cart.userId;
            }

            dispatch(cartActions.replaceCart(payload));

        } catch (error) {

            showError(error.message);

        }


    };

};

export const addToCartHandler = (userId, token, productId) => {

    return async dispatch => {

        let payload = {};

        let priceOfProduct = 0;

        const cart = await fetchCartRequest(userId, token);

        if (cart === undefined) {
            payload.products = [];
            payload.totalItems = 0;
            payload.cartPrice = 0;
            payload.userId = null;
        }

        else {

            let productsArr = cart.products;

            // let existingProduct = productsArr.find(product => product.product === productId);
            let existingProduct = productsArr.findIndex(product => product.product === productId);

            // If the product exists
            if (existingProduct >= 0) {

                priceOfProduct = (productsArr[existingProduct].totalProductsPrice) / productsArr[existingProduct].totalProductsQuantity;

                const newTotalProductsQuantity = productsArr[existingProduct].totalProductsQuantity + 1;
                const newTotalProductsPrice = priceOfProduct * newTotalProductsQuantity;

                productsArr[existingProduct].totalProductsPrice = newTotalProductsPrice;
                productsArr[existingProduct].totalProductsQuantity = newTotalProductsQuantity;

                payload.products = productsArr;
                payload.totalItems = cart.totalItems + 1;
                payload.cartPrice = cart.cartPrice + priceOfProduct;
                payload.userId = cart.userId;

                dispatch(cartActions.replaceCart(payload));

            } else {    // The product does not exist

                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/products/${productId}`);

                const data = await response.json();

                const requestedProduct = data.data.product;

                const newproductId = requestedProduct._id.toString();
                priceOfProduct = requestedProduct.price;

                const newProduct = {
                    product: newproductId,
                    totalProductsPrice: priceOfProduct,
                    totalProductsQuantity: 1
                };

                productsArr.push(newProduct);

                payload.products = productsArr;
                payload.totalItems = cart.totalItems + 1;
                payload.cartPrice = cart.cartPrice + priceOfProduct;
                payload.userId = cart.userId;

                dispatch(cartActions.replaceCart(payload));

            }

            try {

                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/cart/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        products: productsArr,
                        totalItems: cart.totalItems + 1,
                        cartPrice: cart.cartPrice + priceOfProduct
                    })
                });

                const data = await response.json();

                if (data.status !== 'success') {

                    showError(data.message);
                    return;

                }

            } catch (error) {

                showError(error.message);

            }
        }

    };

};

export const removeFromCartHandler = (userId, token, productId) => {

    return async dispatch => {

        let payload = {};

        let priceOfProduct = 0;

        const cart = await fetchCartRequest(userId, token);

        if (cart === undefined) {
            payload.products = [];
            payload.totalItems = 0;
            payload.cartPrice = 0;
            payload.userId = null;
        }

        else {
            let productsArr = cart.products;

            // let existingProduct = productsArr.find(product => product.product === productId);
            let existingProduct = productsArr.findIndex(product => product.product === productId);

            if (existingProduct >= 0) {

                const existingProductDetails = productsArr[existingProduct];

                priceOfProduct = existingProductDetails.totalProductsPrice / existingProductDetails.totalProductsQuantity;

                const existingProductQuantity = existingProductDetails.totalProductsQuantity;

                if (existingProductQuantity === 1) {

                    productsArr = productsArr.filter(product => product.product !== productId);

                    payload.products = productsArr;
                    payload.totalItems = cart.totalItems - 1;
                    payload.cartPrice = cart.cartPrice - (existingProductDetails.totalProductsPrice / existingProductDetails.totalProductsQuantity);
                    payload.userId = cart.userId;

                    dispatch(cartActions.replaceCart(payload));

                } else {

                    const newExistingProductsQuantity = existingProductQuantity - 1;

                    const singleProductPrice = existingProductDetails.totalProductsPrice / existingProductDetails.totalProductsQuantity;

                    const newExistingProductsPrice = existingProductDetails.totalProductsPrice - singleProductPrice;

                    productsArr[existingProduct].totalProductsPrice = newExistingProductsPrice;
                    productsArr[existingProduct].totalProductsQuantity = newExistingProductsQuantity;

                    payload.products = productsArr;
                    payload.totalItems = cart.totalItems - 1;
                    payload.cartPrice = cart.cartPrice - singleProductPrice;
                    payload.userId = cart.userId;

                    dispatch(cartActions.replaceCart(payload));

                }

            } else {

                showError('Item is not present in the cart');

            }

            try {

                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/cart/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        products: productsArr,
                        totalItems: cart.totalItems - 1,
                        cartPrice: cart.cartPrice - priceOfProduct
                    })
                });

                const data = await response.json();

                if (data.status !== 'success') {

                    showError(data.message);
                    return;

                }

            } catch (error) {

                showError(error.message);

            }
        }

    };

};