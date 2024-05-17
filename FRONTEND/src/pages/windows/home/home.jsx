import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchHomePageData } from '../../../redux/actions/homeActions'; 
import './homeCss.css';

import Carousal from '../../../components/windows/carousal/carousal.jsx';
import Banner from '../../../components/windows/banner/banner.jsx';
import ShopByCategory from '../../../components/windows/shopByCategory/shopByCategory.jsx';
import HomePageProducts from "../../../components/windows/homePageProducts/homePageProducts.jsx";
import Loading from "../../../components/windows/loading/loading.jsx";
import FeaturedProduct from "../../../components/windows/featuredProduct/featuredProduct.jsx"

import b1 from './b1.png';
import b2 from './newsletter.png';

import men from "./categoryImages/mens.jpg";
import women from "./categoryImages/women.webp";
import electronics from "./categoryImages/electronics.jpg";
import jewelery from "./categoryImages/jewelery.png";


const Home = () => {
  const data = [
    { id: 1, url: men },
    { id: 2, url: women },
    { id: 3, url: electronics },
    { id: 4, url: jewelery }
  ];
  const categories = [
    { id: 1, category: "mobile" },
    { id: 2, category: "tshirt" },
    { id: 3, category: "backcover" },
    { id: 4, category: "electronics" }
  ];
  const { products, loading: loadingProducts } = useSelector(state => state.products);

  // const dispatch = useDispatch();
  // const { loading, error } = useSelector(state => state.homePage);
  const loading = false;
  const error = false; 
  useEffect(() => {
    // dispatch(fetchHomePageData());
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  return (
    <div id='home-div-container'>
      <Helmet>
        <title>Bharat|Shop</title>
        <meta name="description" content="Description of your home page" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error.message}</div> 
      ) : (
        <>
          <div id='home-div'>
            <Carousal />
            <ShopByCategory data={data} />
            <HomePageProducts categories={categories} products={products} loading={loadingProducts} />
            <Banner imageUrl={b2}/>
            <FeaturedProduct products={products} loading={loadingProducts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;


