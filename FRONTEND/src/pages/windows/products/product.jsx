import React, { useEffect } from 'react';
import AllProductPageCard from '../../../components/windows/allProductPageCard/allProductPageCard.jsx';
import { Helmet } from 'react-helmet';
import './productCss.css';

import {useSelector } from 'react-redux';

const Product = () => {
  
  const { products, loading, error } = useSelector(state => state.products);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior:'instant',
    });
  }, []);


  return (
    <div className="Product">
      <Helmet>
        <title>Product Page</title>
        <meta name="description" content="Description of your product page" />
      </Helmet>
      <AllProductPageCard products={products} loading={loading} error={error}/>
    </div>
  );
}

export default Product;




