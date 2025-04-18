import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../api';
import ProductCard from '../components/ProductCard';
import '../css/SearchDetails.css';

const SearchDetails = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();

        // fallback in case it's in response.data
        const products = Array.isArray(data) ? data : data.data || [];

        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setResults([]);
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="search-details">
      <h2>Search Results for "{query}"</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : results.length === 0 ? (
        <p className="no-results">No products found 😢</p>
      ) : (
        <div className="results-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDetails;
