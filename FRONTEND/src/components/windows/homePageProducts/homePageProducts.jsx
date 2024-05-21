import React, { useState, useEffect} from 'react';
import "./homePageProductsCss.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../productCard/productCard.jsx";
import Loading from "../loading/loading.jsx";

const HomePageCategoryProducts = ({ categories, products, loading }) => {
    const [sliderRefs, setSliderRefs] = useState([]);

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
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 200,
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
                {categories.map((item, index) => {
                    // Filter out categories with no associated products
                    const categoryProducts = products.filter(product => Array.isArray(product.category) && product.category.includes(item.category));
                    if (categoryProducts.length === 0) return null; // Skip rendering if no products for this category
                    return (
                        <div className='home-page-category-products-container' key={item.id}>
                            <div className="home-page-category-products">
                                <div className="home-page-category-products-left">
                                    {item.category.toUpperCase()}
                                    <span className="shop-by-category-name-bar"></span>
                                </div>
                            </div>

                            <div className='slider-container'>
                                <div className="row gx-1 sliderParent">
                                    <Slider {...settings} ref={sliderRefs[index]} >
                                        {categoryProducts.map(product => (
                                            <div className='col-md-1 men-slider-columns' key={product.id}>
                                                <ProductCard id={product._id} image={product.images[0]} title={product.title} price={product.price} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className="home-page-category-products-button-container">
                                <button className="home-page-category-products-button" onClick={() => handleNextSlide(index)}>
                                    <IoIosArrowBack size={25} fontWeight={100} color={"white"} />
                                </button>
                                <button className="home-page-category-products-button" onClick={() => handlePrevSlide(index)}>
                                    <IoIosArrowForward size={25} fontWeight={100} color={"white"} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <Loading />;
    }
};
export default HomePageCategoryProducts;





