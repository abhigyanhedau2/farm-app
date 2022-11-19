import React from 'react';
import { useEffect } from 'react';
import Cart from '../components/Cart/Cart';

const CartPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Cart`;
    }, []);

    return <Cart />;
};

export default CartPage;