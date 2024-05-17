import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Rating from "react-rating-stars-component";
import './featuredProductCardCss.css';
const FeaturedProductCard = ({ id, image, title, price }) => {
    const navigate = useNavigate();
    return (
        <div className="featured-product-card">
            <div className="featured-product-card-top" onClick={() => navigate(`/${id}`)}>
                <img className="featured-product-image" src={image} alt={title} />
            </div>
            <div className="featured-product-card-bottom">
                <div className="featured-product-price-rating">
                    <span className="featured-product-price">₹{price}</span>
                    <Rating
                        count={5}
                        size={15}
                        value={4}
                        activeColor="#ffd700"
                        emptyColor="black"
                        edit={true}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        filledIcon={<i className="fas fa-star"></i>}
                    />
                </div>
                <div className="featured-product-title">
                    {title.length > 50 ? `${title.substr(0, 50)}...` : title}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProductCard;


