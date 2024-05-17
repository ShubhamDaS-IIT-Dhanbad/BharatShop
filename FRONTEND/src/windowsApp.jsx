import React from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy } from 'react'
import axios from 'axios'

import Userauth from './utils/userAuth.jsx'
import AuthRouteWrapper from './utils/AuthRouteWrapper.jsx'

import Navbar from './components/windows/header/navbar.jsx'
import Hidenavbar from './components/windows/header/hideNavbar.jsx'

import Footer from './components/windows/footer/footer.jsx'
import Hidefooter from './components/windows/footer/hideFooter.jsx'

import Account from './pages/windows/user/user.jsx'

import Login from './components/windows/login/login.jsx'
import Signup from './components/windows/signup/signuppage.jsx'

import PageNotFound from './components/windows/pageNotFound/pageNotFound.jsx'

import { useDispatch, useSelector } from 'react-redux';

const Home = lazy(() => import('./pages/windows/home/home.jsx'))
import SingleProduct from './pages/windows/singleProduct/singleProduct.jsx'
import Products from './pages/windows/products/product.jsx'

import { fetchProducts,setFilteredProducts } from './redux/features/products/productSlics.jsx';
import { setIsAuthenticated} from './redux/features/logInLogout/authenticationSlice.jsx';
import {setUser} from './redux/features/userData/userDataSlice.jsx';

const Windowsapp = React.memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts()); 
    dispatch(setFilteredProducts());
    dispatch( setUser());
    dispatch( setIsAuthenticated());
  }, [dispatch]);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        // Handle error here
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  return (
    
    <>
      <Router>
        <Hidenavbar><Navbar /></Hidenavbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<AuthRouteWrapper element={<Account />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/:productId' element={<SingleProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Hidefooter><Footer></Footer></Hidefooter>
      </Router>
    </>
  )
  });

export default Windowsapp