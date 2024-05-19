import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../loading/loading';
import AllProductPageCard from '../allProductPageCard/allProductPageCard';
import "./searchPageCss.css"

function SearchPage() {
  const { keyword } = useParams(); // assuming 'keyword' is the parameter you're using for search
  const [loading, setLoading] = useState(true);
  const searchedProducts = useSelector(state => state.products.searchedProducts); // accessing 'searchedProducts' from the Redux state
console.log()
  useEffect(() => {
    setLoading(false); // assuming you handle loading state elsewhere when data fetching is done
  }, [searchedProducts]);

  if (loading) return <Loading />;

  return (
    <div className='category-product-page-container'>
      {searchedProducts && <AllProductPageCard products={searchedProducts} />}
    </div>
  );
}

export default SearchPage;
