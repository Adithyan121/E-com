import React from 'react';
import '../css/ProductCard.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa'; // React Icons

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist } = useAppContext();

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars.join(' ');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-img" />
      </Link>

      <div className="product-info">
        <h4 className="product-title">{product.title.slice(0, 40)}...</h4>
        
        {/* Rating */}
        <div className="product-rating">
          <span className="stars">{getRatingStars(product.rating)}</span>
          <span>({product.reviews} reviews)</span>
        </div>

        {/* Price and Discount */}
        <div>
          <span className="product-price">₹ {(product.price * 85).toFixed(0)}</span>
          {product.discount && (
            <span className="product-discount">${product.originalPrice}</span>
          )}
        </div>
        <div className="product-actions">
          <button 
            onClick={() => addToCart(product)} 
            className="product-action-add-to-cart">
            <FaShoppingCart size={20} /> Add to Cart
          </button>
          <button 
            onClick={() => addToWishlist(product)} 
            className="product-action-wishlist">
            <FaRegHeart size={20} /> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
