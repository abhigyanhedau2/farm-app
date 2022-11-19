import React from 'react';
import { useEffect } from 'react';
import AddSeller from '../components/AddSeller/AddSeller';

const AddSellerPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Birch Wood Ranch | Add Seller';
    }, []);

    return <AddSeller />;
};

export default AddSellerPage;