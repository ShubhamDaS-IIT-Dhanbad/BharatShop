import React, { useState } from 'react';
import PriceRangeFilter from './sections/priceRangeFilter.jsx';
import BrandFilter from './sections/brandFilter.jsx';
import CategoryFilter from './sections/categoryFilter.jsx';
import RatingFilter from './sections/ratingFilter.jsx';

import "./filterSectionCss.css"
const FilterSection = () => {
  const [filters, setFilters] = useState({
    priceRange: { minPrice: '', maxPrice: '' },
    selectedBrands: [],
    selectedCategories: [],
    selectedRatings: [],
  });

  const handlePriceRangeChange = (range) => {
    setFilters({ ...filters, priceRange: range });
  };

  const handleBrandChange = (selectedBrands) => {
    setFilters({ ...filters, selectedBrands });
  };

  const handleCategoryChange = (selectedCategories) => {
    setFilters({ ...filters, selectedCategories });
  };

  const handleRatingChange = (selectedRatings) => {
    setFilters({ ...filters, selectedRatings });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: { minPrice: '', maxPrice: '' },
      selectedBrands: [],
      selectedCategories: [],
      selectedRatings: [],
    });
  };

  return (
    <div className="filter-section">
      <h2>Filter Section</h2>
      <PriceRangeFilter onChange={handlePriceRangeChange} />
      <BrandFilter onChange={handleBrandChange} selectedBrands={filters.selectedBrands} />
      <CategoryFilter onChange={handleCategoryChange} selectedCategories={filters.selectedCategories} />
      <RatingFilter onChange={handleRatingChange} selectedRatings={filters.selectedRatings} />
      <button onClick={clearAllFilters}>Clear All</button>
    </div>
  );
};

export default FilterSection;
