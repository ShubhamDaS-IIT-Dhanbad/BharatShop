import React, { useState,useEffect } from 'react';
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
import { fetchProducts } from '../../../redux/features/products/productSlics.jsx'

import b2 from './b1.png';

import men from "./categoryImages/mens.jpg";
import women from "./categoryImages/women.webp";
import electronics from "./categoryImages/electronics.jpg";
import jewelery from "./categoryImages/jewelery.png";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading: loadingProducts, error } = useSelector(state => state.products);
  const [loading,setLoading]=useState(true)
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

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const pinCodesString = userData ? userData.pinCodes.join(', ') : "";
    const pinCode = pinCodesString?pinCodesString:""; 
    dispatch(fetchProducts({pinCode}));
    setLoading(false);
  }, [dispatch]);

  if (loadingProducts && loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div id='home-div-container'>
      <Helmet>
        <title>Bharat|Shop</title>
        <meta name="description" content="Description of your home page" />
      </Helmet>
      <div id='home-div'>
        <Carousal />
        <ShopByCategory data={data} />
        <HomePageProducts categories={categories} products={products} loading={loadingProducts} />
        <Banner imageUrl={b2}/>
        <FeaturedProduct products={products} loading={loadingProducts} />
      </div>
    </div>
  );
};

export default Home;
