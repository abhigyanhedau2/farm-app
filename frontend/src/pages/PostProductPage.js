import React, { useEffect } from 'react';

import PostProduct from '../components/PostProduct/PostProduct';

const PostProductPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Post Product`;
    }, []);

    return <PostProduct />;
};

export default PostProductPage;