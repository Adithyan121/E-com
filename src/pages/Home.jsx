import React, { useEffect, useState } from 'react';
import '../css/home.css';
import { getAllProducts } from '../api';
import ProductCard from '../components/ProductCard';
import LoginPopup from '../components/LoginPopup';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus !== 'true') {
      setShowLogin(true);
    }

    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h2 className="home-heading">Latest Products</h2>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Home;
