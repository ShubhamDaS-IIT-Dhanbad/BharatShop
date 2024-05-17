import React from 'react'
import "./shopByCategoryCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import { useRef } from "react";

// icons used
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// images imported

const Category = ({data}) => {
    const sliderRef = useRef(null);
    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true, // Allow swipe to slide
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
    const goToNextSlide = () => { sliderRef.current.slickNext()};
    const goToPrevSlide = () => { sliderRef.current.slickPrev(); };


    return (
        <div className='shop-by-category-container'>
            <div className="shop-by-category-name">
                CATEGORIES
                <span className="shop-by-category-name-bar"></span>
                <span className="shop-by-category-name-ball"></span>
            </div>
            {/* slider component */}
            <div className='slider-container'>
                <div className="custom-arrow next-arrow" onClick={goToPrevSlide}>
                    < IoIosArrowBack className="arrow" size={39} fontWeight={100} />
                </div>
                <div className="row  gx-1 sliderParent">
                    <Slider {...settings} ref={sliderRef}>
                        {data.map(item => (
                            <div className='col-md-1' id={item.id}>
                                <div className='sliderParent-image'>
                                    <img className='img-fluid' src={item.url} />
                                </div>
                            </div>

                        ))}
                    </Slider>
                </div>
                <div className="custom-arrow prev-arrow" onClick={goToNextSlide}>
                    < IoIosArrowForward className='arrow' size={39} />
                </div>
            </div>
        </div>
    );
};
export default Category;