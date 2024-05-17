import React, { useState } from 'react';
import './priceRangeFilterCss.css';

const PriceRangeFilter = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleApplyFilter = () => {
    if (minPrice !== '' && maxPrice !== '') {
      onChange({ minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice) });
    }
  };

  return (
    <div className="price-range-filter">
      <label>Min Price:</label>
      <input type="number" value={minPrice} onChange={handleMinPriceChange} />
      <label>Max Price:</label>
      <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
      <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default PriceRangeFilter;
