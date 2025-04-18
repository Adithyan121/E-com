import React, { useEffect, useState } from 'react';
import '../css/account.css';
import img from "../assets/user.png"

const Account = () => {
  const [user, setUser] = useState({ username: '', email: '', phone: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        username: storedUser.username || 'JohnDoe',
        email: storedUser.email || 'johndoe@example.com',
        phone: storedUser.phone || '+91-9876543210',
      });
    }
  }, []);

  return (
    <div className="account-container">
      <h2>My Account</h2>

      {/* Profile Section */}
      <div className="section profile-section">
        <h3>Profile Information</h3>
        <div className="profile-card">
          <img src={img} alt="Profile" className="profile-img" />
          <div className="info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <button className="btn">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="section">
        <h3>Saved Cards</h3>
        <ul>
          <li>**** **** **** 1234 (Visa)</li>
          <li>**** **** **** 5678 (MasterCard)</li>
        </ul>
        <button className="btn">Add New Card</button>
      </div>

      {/* Addresses */}
      <div className="section">
        <h3>Shipping & Billing Addresses</h3>
        <ul>
          <li>123 Street, Kochi, Kerala - 682001</li>
          <li>456 Lane, Bangalore, Karnataka - 560001</li>
        </ul>
        <button className="btn">Add New Address</button>
      </div>

      {/* Settings */}
      <div className="section">
        <h3>Account Settings</h3>
        <ul>
          <li>Change Password</li>
          <li>Notification Preferences</li>
          <li>Language: English</li>
        </ul>
      </div>

      {/* Security */}
      <div className="section">
        <h3>Security</h3>
        <ul>
          <li>Two-factor Authentication: Enabled</li>
          <li>Last Login: Apr 12, 2025 - 8:22 PM</li>
          <li>Device History: Chrome, Android, Windows</li>
        </ul>
      </div>

      {/* Others */}
      <div className="section">
        <h3>Extras</h3>
        <ul>
          <li>Loyalty Points: 250</li>
          <li>Coupons: 3 available</li>
          <li>Referral Code: ABCD1234</li>
          <li>Recently Viewed: Shoes, Headphones, Watch</li>
          <li>Subscription: Newsletter (Active)</li>
          <li>Return & Refund Requests: 1 (Pending)</li>
          <li><button className="btn btn-small">Download Invoices</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
