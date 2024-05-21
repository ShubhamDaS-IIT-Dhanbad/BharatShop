import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchShop } from '../../../redux/features/shop/shopSlice';
import BrandFilter from './sections/brandFilter.jsx';
import CategoryFilter from './sections/categoryFilter.jsx';
import './filterSectionShopCss.css';

const FilterSectionShop = () => {
  const dispatch = useDispatch(); 
  const [filters, setFilters] = useState(() => {
    const savedCategories = localStorage.getItem('selectedCategories');
    return {
      priceRange: { minPrice: '', maxPrice: '' },
      selectedBrands: [],
      selectedCategories: savedCategories ? JSON.parse(savedCategories) : [],
      selectedRatings: [],
    };
  });
  useEffect(() => {
    const { priceRange,selectedCategories, selectedRatings } = filters;
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const pinCode = userData ? userData.pinCodes.join(', ') : "";
    dispatch(fetchShop({ pinCode , priceRange,selectedCategories, selectedRatings }));
    dispatch(fetchShop({
      pinCode,
      selectedCategories,
      selectedRatings,
      priceRange,
    }));
  }, [filters]);
  const handleBrandChange = (selectedBrands) => {
    setFilters((prevFilters) => ({ ...prevFilters, selectedBrands }));
  };
  const handleCategoryChange = (selectedCategories) => {
    setFilters((prevFilters) => ({ ...prevFilters, selectedCategories }));
  };
  const clearAllFilters = () => {
    setFilters({
      priceRange: { minPrice: '', maxPrice: '' },
      selectedBrands: [],
      selectedCategories: [], // Clear all selected categories
      selectedRatings: [],
    });
    localStorage.removeItem('selectedCategories');
  };
  return (
    <div className="shop-filter-section">
      <div className="shop-filter-section-top">
        <p>FILTER</p>
        {/* <button className="clear-all-button" onClick={clearAllFilters}>CLEAR ALL</button> */}
      </div>
      <CategoryFilter onChange={handleCategoryChange} clearAllFilters={clearAllFilters}/>
      <BrandFilter onChange={handleBrandChange} clearAllFilters={clearAllFilters}/>
    </div>
  );
};
export default FilterSectionShop;
