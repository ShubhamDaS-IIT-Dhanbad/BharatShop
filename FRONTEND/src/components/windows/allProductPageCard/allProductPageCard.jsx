import React, { useState, useEffect } from 'react';
import AllProductCard from "../allProductCard/allProductCard.jsx";
import "./allProductPageCardCss.css";
import FilterSection from "../filterSection/filterSection.jsx";
import Loading from "../loading/loading.jsx";

function AllProductPageCard({ products, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    // Scroll to the top of the page instantly when the currentPage changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="all-product-page-error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="all-product-page-empty-message">No products available</div>;
  }

  return (
    <div className="all-product-page-container">
      <FilterSection />
      <div className="all-product-page-content">
        <div className="all-product-page-grid">
          {currentProducts.map(product => (
            <div key={product._id}>
              <AllProductCard
                id={product._id}
                image={product.images[0]}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
        <div className="all-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="all-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < products.length && (
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
