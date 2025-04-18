import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import { useAppContext } from '../context/AppContext';
import '../css/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist } = useAppContext();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details">
      <div className="left-panel">
        <div className="image-wrapper">
          <img src={product.image} alt={product.title} className="product-img" />
        </div>
        <div className="button-group">
          <button onClick={() => addToCart(product)} className="cart-btn">Add to Cart</button>
          <button onClick={() => addToWishlist(product)} className="wishlist-btn">Wishlist</button>
        </div>
      </div>
      <div className="right-panel">
        <h1 className="title">{product.title}</h1>
        <p className="rating">★ {product.rating?.rate} ({product.rating?.count} ratings)</p>
        <p className="price">₹ {(product.price * 85).toFixed(0)}</p>
        <p className="category">Category: {product.category}</p>
        <p className="desc">{product.description}</p>
        <ul className="features">
          <li>✔️ 10-day Replacement Policy</li>
          <li>✔️ Cash on Delivery available</li>
          <li>✔️ Secure Payment</li>
          <li>✔️ EMI starting from ₹199/month</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
