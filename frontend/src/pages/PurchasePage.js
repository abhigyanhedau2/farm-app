import React from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import Purchases from '../components/Purchases/Purchases';

import purchasesBg from '../assets/purchases-bg.jpg';

const PurchasePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Birch Wood Ranch | My Orders';
    }, []);

    return (
        <Fragment>
            <CategoryHeader category="My Orders" image={purchasesBg} />
            <Purchases />
        </Fragment>
    );
};

export default PurchasePage;