import React from 'react';
import Rating from "react-rating-stars-component";
import "./allProductCardCss.css"; // Assuming you have the CSS file imported correctly

import { useNavigate } from 'react-router-dom';

function ProductCard({ id, image, title, price }) {
    const navigate = useNavigate();
    return (
        <div className="all-product-card">
            <div className='all-product-card-top' onClick={() => navigate(`/product/${id}`)}>
                <img className="all-product-image" src={image} alt="product" />

            </div>

            <div className='all-product-card-bottom'>
                <div className="all-product-card-shop-price">
                    <div className='all-product-card-shop-name-div'>
                        <span className='all-product-card-price'>₹{price}</span>
                        <Rating
                            count={5}
                            size={15}
                            value={4}
                            activeColor="#ffd700"
                            emptyColor="black"
                            edit={true}
                            margin="10px"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            filledIcon={<i className="fas fa-star"></i>}
                        />
                        <span className='all-product-card-title'>{`${title.substr(0, 50)}..`}</span>
                    </div>
                </div>
                <div className="shop-details">
                    <span className="shop-name"></span>
                </div>
                {/* 
                <div className='all-product-card-button-container'>
                    <div className="button">
                        <button onClick={() => navigate(`/${id}`)}>VIEW DETAILS</button>
                    </div>
                    <div className="button">
                        <button>ADD TO CART</button>
                    </div>
                </div>
                */}
            </div>
        </div>
    );
}

export default ProductCard;
