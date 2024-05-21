import React, { useState, useEffect } from 'react';
import './shopPageCss.css';
import FilterSectionShop from "../../../components/windows/filterSectionShop/filterSectionShop.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop } from '../../../redux/features/shop/shopSlice.jsx';
import ShopCard from '../../../components/windows/shopCard/shopCard.jsx';

function AllProductPageCard() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const shops = useSelector(state => state.shop.shops);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentShops = shops.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    window.scrollTo(0, 0);
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const pinCode = userData ? userData.pinCodes.join(', ') : "";
    dispatch(fetchShop({ pinCode }));
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="all-product-page-container">
      <FilterSectionShop />
      <div className="all-product-page-content">
        <div className="all-product-page-grid">
          {currentShops.map(shop => (
            <div key={shop._id}>
              <ShopCard shop={shop}/>
            </div>
          ))}
        </div>
        <div className="all-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="all-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < shops.length && (
            <button className="all-product-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProductPageCard;
