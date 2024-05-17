import React, { useState, useEffect, useRef } from 'react';
import "./homePageProductsCss.css";

import { useSelector } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../productCard/productCard.jsx";
import Loading from "../loading/loading.jsx";

const HomePageCategoryProducts = ({categories,products,loading}) => {
    console.log("hi----",loading,categories,products);
    const [sliderRefs, setSliderRefs] = useState([]);
    const [showAllCategories, setShowAllCategories] = useState(false);

    useEffect(() => {
        setSliderRefs(Array(categories.length).fill().map((_, i) => sliderRefs[i] || React.createRef()));
    }, [categories.length, products]);

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

    const handleNextSlide = (index) => {
        sliderRefs[index].current.slickNext();
    };

    const handlePrevSlide = (index) => {
        sliderRefs[index].current.slickPrev();
    };

    if (!loading) {
        return (
            <div className='home-page-category-products-container-parent'>
                {(showAllCategories ? categories : categories.slice(0, 2)).map((item, index) => (
                    products.some(product => product.category === item.category) && (
                        <div className='home-page-category-products-container' key={item.id}>
                            <div className="home-page-category-products">
                                <div className="home-page-category-products-left">
                                    {item.category.toUpperCase()}
                                    <span className="shop-by-category-name-bar"></span>
                                    {/* <span className="shop-by-category-name-ball"></span> */}
                                </div>
                                {/* <div className="home-page-category-products-span"></div> */}
                                {/* <div className="home-page-category-products-right">
                                    <button className="home-page-category-products-button" onClick={() => handleNextSlide(index)}>
                                        <IoIosArrowBack size={25} fontWeight={100} color={"white"} />
                                    </button>
                                    <button className="home-page-category-products-button" onClick={() => handlePrevSlide(index)}>
                                        <IoIosArrowForward size={25} fontWeight={100} color={"white"} />
                                    </button>
                                </div> */}
                            </div>

                            <div className='slider-container'>
                                <div className="row gx-1 sliderParent">
                                    <Slider {...settings} ref={sliderRefs[index]}>
                                        {products.map(product => (
                                            product.category === item.category && (
                                                <div className='col-md-1 men-slider-columns' key={product.id}>
                                                    <ProductCard id={product._id} image={product.images[0]} title={product.title} price={product.price} />
                                                </div>
                                            )
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className="home-page-category-products-right">
                                    <button className="home-page-category-products-button" onClick={() => handleNextSlide(index)}>
                                        <IoIosArrowBack size={25} fontWeight={100} color={"white"} />
                                    </button>
                                    <button className="home-page-category-products-button" onClick={() => handlePrevSlide(index)}>
                                        <IoIosArrowForward size={25} fontWeight={100} color={"white"} />
                                    </button>
                                </div>
                        </div>
                    )
                ))}
                {!showAllCategories && (
                    <div className='view-more-container-home-page'>
                        <button className='view-more-button-home-page' onClick={() => setShowAllCategories(true)}>View More</button>
                    </div>
                )}
            </div>
        );
    } else {
        return <Loading />;
    }
};

export default HomePageCategoryProducts;



