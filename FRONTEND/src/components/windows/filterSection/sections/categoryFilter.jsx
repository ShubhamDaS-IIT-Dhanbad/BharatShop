import React, { useState } from 'react';
import './categoryFilterCss.css';

const CategoryFilter = ({ onChange, selectedCategories }) => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleApplyFilter = () => {
    onChange(category);
  };

  return (
    <div className="category-filter">
      <label>Category:</label>
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="Category 1">Category 1</option>
        {/* Add more category options as needed */}
      </select>
      <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default CategoryFilter;
