import React from 'react';
import Slider from 'react-slick';import { useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../productCard/productCard.jsx"



import "./homePageCategoryProductCardCss.css"
function  HomePageCategoryProductCard({category,data}) {
    const img = "p1.jpg";
    const sliderRef = useRef(null);
    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 2,
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

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };
    return (
        <div className='slider-container'>
            <div className="custom-arrow next-arrow" onClick={goToPrevSlide}>
                < IoIosArrowBack className="arrow" size={39} fontWeight={100} onClick={goToNextSlide}/>
            </div>
            <div className="row  gx-1 sliderParent">
                <Slider {...settings} ref={sliderRef}>

                    {data.map(item=> (
                        (item.category ===category) && (
                        <div className='col-md-1 men-slider-columns' key={item.id}>
                            <ProductCard image={item.image} title={item.title} price={item.price}/>
                        </div>
                        )
                    ))}
                </Slider>
            </div>
            <div className="custom-arrow prev-arrow" onClick={goToNextSlide}>
                < IoIosArrowForward className='arrow' size={39} onClick={goToPrevSlide}/>
            </div>
        </div>
    );
}

export default HomePageCategoryProductCard;