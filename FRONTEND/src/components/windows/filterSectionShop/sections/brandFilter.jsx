import React, { useState, useEffect } from 'react';
import './brandFilterCss.css';

const BrandFilter = ({ onChange}) => {

  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "Asics", "Converse", "Vans", "Skechers"];
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const isChecked = e.target.checked;

    setSelectedBrands(prevSelectedBrands => 
      isChecked ? [...prevSelectedBrands, brand] : prevSelectedBrands.filter(item => item !== brand)
    );
  };
  useEffect(() => {
    onChange(selectedBrands);
  }, [selectedBrands]);
  const handleViewMoreClick = () => {
    setShowAllBrands(true);
  };
  return (
    <div className="brand-filter">
      <label className='brand-filter-label'>BRANDS</label>
      <div className="brand-checkbox-options">
        {brands.slice(0, showAllBrands ? brands.length : 9).map((brand, index) => (
          <label key={index}  className='checkbox-options-label'>
            <input
              type="checkbox"
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={handleBrandChange}
            />
            {brand}
          </label>
        ))}
        {!showAllBrands && brands.length > 9 && (
          <button onClick={handleViewMoreClick}  className='brand-filter-button'>View More</button>
        )}
      </div>
    </div>
  );
};

export default BrandFilter;


