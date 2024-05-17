import React, { useState, useEffect, useRef } from 'react';
import "./featuredProductCss.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../productCard/productCard.jsx";
import Loading from "../loading/loading.jsx";

const FeaturedProduct = ({ products, loading }) => {
    const [sliderRef, setSliderRef] = useState(null);
    const [showAllCategories, setShowAllCategories] = useState(false);

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleNextSlide = () => {
        sliderRef.slickNext();
    };

    const handlePrevSlide = () => {
        sliderRef.slickPrev();
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className='home-page-category-products-container-parent'>
                <div className='home-page-category-products-container'>
                    <div className="home-page-category-products">
                        <div className="home-page-category-products-left">
                            FEATURED PRODUCTS
                            <span className="shop-by-category-name-bar"></span>
                        </div>
                        
                    </div>

                    <div className='slider-container'>
                        <div className="row gx-1 sliderParent">
                            <Slider {...settings} ref={(slider) => setSliderRef(slider)}>
                                {products.map(product => (
                                    <div className='col-md-1 men-slider-columns' key={product.id}>
                                        <ProductCard 
                                            id={product._id} 
                                            image={product.images[0]} 
                                            title={product.title} 
                                            price={product.price} 
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="home-page-category-products-right">
                            <button className="home-page-category-products-button" onClick={handlePrevSlide}>
                                <IoIosArrowBack size={25} color={"white"} />
                            </button>
                            <button className="home-page-category-products-button" onClick={handleNextSlide}>
                                <IoIosArrowForward size={25} color={"white"} />
                            </button>
                        </div>
            </div>
        );
    }
};

export default FeaturedProduct;


