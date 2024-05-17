import React, { useState } from 'react';
import './brandFilterCss.css';

const BrandFilter = ({ onChange, selectedBrands }) => {
  const [brands, setBrands] = useState([...selectedBrands]);

  const handleBrandChange = (brand) => {
    if (brands.includes(brand)) {
      setBrands(brands.filter((b) => b !== brand));
    } else {
      setBrands([...brands, brand]);
    }
  };

  const handleApplyFilter = () => {
    onChange(brands);
  };

  return (
    <div className="brand-filter">
      <label>Brands:</label>
      <div>
        <input
          type="checkbox"
          id="brand1"
          className="brand-checkbox"
          checked={brands.includes('Brand 1')}
          onChange={() => handleBrandChange('Brand 1')}
        />
        <label htmlFor="brand1">Brand 1</label>
        {/* Add more brand checkboxes as needed */}
      </div>
      <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default BrandFilter;
