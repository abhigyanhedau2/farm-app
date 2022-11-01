import React, { useEffect, useState } from 'react';

import ProductCard from './ProductCard';
import SubCategories from './SubCategories';

import classes from './CategoryProducts.module.css';

const CategoryProducts = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/products/category/${props.category}`);
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();

    }, [props.category]);

    if (products.length !== 0) {
        if (products[0].subCategory) {

            const getHeadings = products.map(item => item.subCategory);
            let getFilteredHeadings = [];
            getFilteredHeadings = getHeadings.filter(e => !(getFilteredHeadings[e] = e in getFilteredHeadings));

            return (
                <div className={classes.subCategoryProductsWrapper}>
                    {getFilteredHeadings.map(heading => {
                        return <SubCategories key={heading} products={products} heading={heading} />
                    })}
                </div>
            )
        }

        else {

            const productCards = products.map(product => {
                return <ProductCard key={product._id} veg={product.veg} image={product.image} name={product.name} description={product.description} quantityPerBox={product.quantityPerBox} icon={product.icon} calories={product.calories} rating={product.rating} price={product.price} />
            });

            return (
                <div className={classes.categoryProductsWrapper}>
                    {productCards}
                </div>
            )
        }
    }

    else {

    }
};

export default CategoryProducts;