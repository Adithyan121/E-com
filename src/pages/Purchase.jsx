import React from 'react';
import '../css/purchase.css';
import { useAppContext } from '../context/AppContext';

const Purchase = () => {
  const { cart, user } = useAppContext();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="purchase-container">
      <h2>Order Summary</h2>

      <div className="purchase-sections">
        {/* Dispatch Section */}
        <div className="purchase-box">
          <h3>Dispatch Info</h3>
          <p>Your items will be dispatched within 1-2 business days.</p>
          <p>Courier: <strong>SpeedEx</strong></p>
          <p>Tracking will be provided once dispatched.</p>
        </div>

        {/* Payment Section */}
        <div className="purchase-box">
          <h3>Payment</h3>
          <p>Payment Mode: <strong>Cash on Delivery</strong> (fake)</p>
          <p>Status: <span className="status success">Confirmed</span></p>
        </div>

        {/* Address Section */}
        <div className="purchase-box">
          <h3>Delivery Address</h3>
          {user ? (
            <p>{user.username}, 123 Main Street, Citytown, 445566</p>
          ) : (
            <p>Please login to view delivery address.</p>
          )}
        </div>

        {/* Cart Items Summary */}
        <div className="purchase-box">
          <h3>Items in Order</h3>
          {cart.length > 0 ? (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        {/* Total Section */}
        <div className="purchase-box total">
          <h3>Total Amount</h3>
          <p><strong>${totalPrice}</strong></p>
          <button className="purchase-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
