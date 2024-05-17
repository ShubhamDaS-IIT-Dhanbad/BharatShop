import React, { useState } from 'react';
import './ratingFilterCss.css';

const RatingFilter = ({ onChange, selectedRatings }) => {
  const [ratings, setRatings] = useState([...selectedRatings]);

  const handleRatingChange = (rating) => {
    if (ratings.includes(rating)) {
      setRatings(ratings.filter((r) => r !== rating));
    } else {
      setRatings([...ratings, rating]);
    }
  };

  const handleApplyFilter = () => {
    onChange(ratings);
  };

  return (
    <div className="rating-filter">
      <label>Ratings:</label>
      <div>
        <input
          type="checkbox"
          id="rating1"
          className="rating-checkbox"
          checked={ratings.includes(1)}
          onChange={() => handleRatingChange(1)}
        />
        <label htmlFor="rating1">1 Star</label>
        {/* Add more rating checkboxes as needed */}
      </div>
      <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default RatingFilter;
