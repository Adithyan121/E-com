import React, { useEffect, useState } from 'react';
import '../css/order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-container">
      <h2>🛍️ Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Order Date:</strong> {order.date || 'N/A'}</p>

            {/* Prevent crash if order.products is missing or not an array */}
            <div className="order-items">
              {(Array.isArray(order.products) ? order.products : []).map((product, index) => (
                <div key={index} className="order-item">
                  <img src={product.image} alt={product.title} />
                  <div>
                    <h4>{product.title}</h4>
                    <p><strong>Price:</strong> ₹ {(product.price * 85).toFixed(0)}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="total">Total: ₹{order.total * 85|| '0.00'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
