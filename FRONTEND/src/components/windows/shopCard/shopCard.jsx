import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from "react-rating-stars-component";
import "./shopCardCss.css"; // Renamed CSS file

import p1 from "./shopimg.jpeg"
function ShopCard({ shop }) {
    const navigate = useNavigate();

    return (
        <div className="shop-card"> {/* Changed class name */}
            <div className="shop-card-top" onClick={() => navigate(`/shop/${shop.id}`)}> {/* Changed class name */}
                <img className="shop-card-image" src={p1} alt="Product" /> {/* Changed class name */}
            </div>
            <div className='shop-card-bottom'> {/* Changed class name */}
                <div className="shop-card-shop-price"> {/* Changed class name */}
                    <div className='shop-card-shop-name-div'>
                        <span className='shop-card-price'> {/* Changed class name */}
                            {shop?.shopName?.toUpperCase()}
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
                        </span>
                        <span className='shop-card-title'>{`${shop?.description?.substr(0, 70)}}..`}</span> {/* Changed class name */}
                    </div>
                </div>
                <div className="shop-card-details"> {/* Changed class name */}
                    <span className="shop-card-name"></span> {/* Changed class name */}
                </div>
                {/* Commented out button section */}
            </div>
        </div>
    );
}

export default ShopCard;
