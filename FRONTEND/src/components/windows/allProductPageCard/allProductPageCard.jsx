
import React, { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
import AllProductCard from "../allProductCard/allProductCard.jsx";
import "./allProductPageCardCss.css";
import FilterSection from "../filterSection/filterSection.jsx"
import Loading from "../loading/loading.jsx"

function AllProductPageCard({category}) {
    const { products, loading, error } = useSelector(state => state.products);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const visibleProducts = showAllProducts ? products : products.slice(0, 16);
    const handleViewMore = () => {
        setShowAllProducts(true);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="product-container">
            <FilterSection />
            <div className='all-product-container'>
                <div className="product-grid all-product">
                    {visibleProducts.map(product => (
                        <div>
                        <AllProductCard
                            id={product._id}
                            key={product.id}
                            image={product.images[0]}
                            title={product.title}
                            price={product.price}
                        />
                        </div>
                    ))}
                </div>
                {!showAllProducts && (
                    <button className="view-more-button" onClick={handleViewMore}>
                        Explore More
                    </button>
                )}
            </div>
        </div>
    );
}
export default AllProductPageCard;



