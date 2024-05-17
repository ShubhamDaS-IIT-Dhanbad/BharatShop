import React, { useEffect } from 'react';
import AllProductPageCard from '../../../components/windows/allProductPageCard/allProductPageCard.jsx';
import { Helmet } from 'react-helmet';
import './productCss.css';

const Product = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior:'instant', // Use smooth scrolling behavior
    });
  }, []); // Empty dependency array ensures it runs only once when the component mounts


  return (
    <div className="Product">
      <Helmet>
        <title>Product Page</title>
        <meta name="description" content="Description of your product page" />
      </Helmet>
      <AllProductPageCard />
    </div>
  );
}

export default Product;




