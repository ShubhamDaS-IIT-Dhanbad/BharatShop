import React, { useState, useEffect } from 'react';
import './categoryFilterCss.css';

const CategoryFilter = ({ onChange }) => {
  const categories = ["medicine", "Women", "Kids","Electronics", "Home Appliances", "Books", "Toys", "Furniture", "Sports", "Beauty"];
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const savedCategories = localStorage.getItem('selectedCategories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    onChange(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="category-filter">
      <label className='category-filter-label'>CATEGORIES</label>
      <div className="category-checkbox-options">
        {categories.map((category, index) => (
          <label key={index} className='checkbox-options-label'>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;


