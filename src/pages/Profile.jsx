import React from 'react';
import '../css/profile.css';
import img from "../assets/user.png"

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    username: 'User',
    email: 'nill',
    phone: '+91 9876543210',
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={img}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-contact">
          
        <h2>{user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <button className="edit-btn">Edit Profile</button>
        </div>
      </div>

      <div className="profile-sections">
        <div className="section">
          <h3>Saved Addresses</h3>
          <p>No addresses saved yet.</p>
          <button className="add-btn">Add Address</button>
        </div>

        <div className="section">
          <h3>Payment Methods</h3>
          <p>No payment methods saved.</p>
          <button className="add-btn">Add Card</button>
        </div>

        <div className="section">
          <h3>Order History</h3>
          <button className="view-btn">View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
