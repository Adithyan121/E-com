import React from 'react';
import '../css/wishlist.css';
import { useAppContext } from '../context/AppContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useAppContext();

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty-msg">Your wishlist is empty 💔</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>₹ {(item.price * 85).toFixed(0)}</p>
              <div className="wishlist-actions">
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <button onClick={() => removeFromWishlist(item.id)} className="remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
