import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import '../css/checkoutFlow.css';

const steps = ['Cart', 'Address', 'Payment', 'Review', 'Confirmation'];
const deliveryStages = ['Preparing to Dispatch', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'];

const CheckoutFlow = () => {
  const { cart, removeFromCart } = useAppContext();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ address: '', card: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryStageIndex, setDeliveryStageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  
  const { width, height } = useWindowSize();
  const total = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0).toFixed(2);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      startDeliveryProgress();

      const simplifiedCart = cart.map(item => ({
        title: item.title,
        price: item.price,
        image: item.image
      }));

      const newOrder = {
        id: Date.now(),
        products: simplifiedCart,
        total,
        date: new Date().toLocaleString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
      localStorage.removeItem('cart'); // clear cart

      setShowConfetti(true);
      nextStep();
    }, 3000);
  };

  const startDeliveryProgress = () => {
    let index = 1;
    const interval = setInterval(() => {
      if (index < deliveryStages.length) {
        setDeliveryStageIndex(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="checkout-container">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="progress-bar">
        {steps.map((label, index) => (
          <div key={index} className={`step ${index <= step ? 'active' : ''}`}>
            <div className="circle">{index + 1}</div>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="cart" className="glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2>🛒 Cart Summary</h2>
            {cart.length === 0 ? <p>Your cart is empty</p> : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="item-info">
                        <h4>{item.title}</h4>
                        <p>${item.price} × {item.qty}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <p><strong>Total:</strong> ${total}</p>
                <div className="btn-group">
                  
                <button className="checkout-btn" onClick={() => navigate('/')}>Back to Home</button>              
                <button className="checkout-btn" onClick={nextStep}>Continue</button>
                </div>
                </>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="address" className="glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2>📦 Delivery Address</h2>
            <input name="name" placeholder="Full Name" value={form.name || ''} onChange={handleChange} />
            <input name="house" placeholder="House/Flat No." value={form.house || ''} onChange={handleChange} />
            <input name="street" placeholder="Street, Locality" value={form.street || ''} onChange={handleChange} />
            <input name="city" placeholder="City" value={form.city || ''} onChange={handleChange} />
            <input name="pin" placeholder="PIN Code" value={form.pin || ''} onChange={handleChange} />
            <input name="state" placeholder="State" value={form.state || ''} onChange={handleChange} />
            <input name="country" placeholder="Country" value={form.country || ''} onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" maxLength="10" value={form.phone || ''} onChange={handleChange} />

            <div className="btn-group">
              <button className="checkout-btn" onClick={prevStep}>Back</button>
              <button className="checkout-btn" onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="payment" className="glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2>💳 Payment Details</h2>
            <select name="bank" value={form.bank || ''} onChange={handleChange}>
              <option value="">Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
            </select>
            <input name="card" placeholder="Card Number" maxLength="16" value={form.card || ''} onChange={handleChange} />
            <input name="cvv" placeholder="CVV" maxLength="3" value={form.cvv || ''} onChange={handleChange} />
            <input type="month" name="expiry" value={form.expiry || ''} onChange={handleChange} />

            <div className="btn-group">
              <button className="checkout-btn" onClick={prevStep}>Back</button>
              <button className="checkout-btn" onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="review" className="glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2>📝 Review Order</h2>
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Address:</strong> {form.house}, {form.street}, {form.city} – {form.pin}, {form.state}, {form.country}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Bank:</strong> {form.bank}</p>
            <p><strong>Card:</strong> **** **** **** {form.card?.slice(-4)}</p>
            <p><strong>Total:</strong> ${total}</p>

            <div className="btn-group">
              <button className="checkout-btn" onClick={prevStep}>Back</button>
              <button className="checkout-btn" onClick={() => {
  localStorage.removeItem('cart'); // clear cart from localStorage
  placeOrder(); // Call the placeOrder function
}}>
  {isProcessing ? 'Placing Order...' : 'Place Order'}
</button>

            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="confirmation" className="glass-card order-confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="check-icon">✔️</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order.</p>
            <p className="tracking">📦 Tracking Status: <strong>{deliveryStages[deliveryStageIndex]}</strong></p>
            <button className="checkout-btn"  onClick={() => {
                 navigate('/')
                window.location.href = '/';
              }}>Back to Home</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutFlow;
