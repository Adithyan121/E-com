import React from 'react';
import '../css/cart.css';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const total = cart
    .reduce((acc, item) => acc + item.price * 85 * (item.qty || 1), 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-heading">🛍️ Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="item-img" />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{(item.price * 85).toFixed(0)}</p>
                  <p>Qty: {item.qty}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {cart.length}</p>
            <p>Total Price: ₹{total}</p>
            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
