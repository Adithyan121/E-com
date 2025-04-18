import React, { useState } from 'react';
import '../css/Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Add this line
    localStorage.setItem('user', JSON.stringify(formData));
    console.log(formData);
    
    alert('Signup successful!');
    navigate('/login');
  };
  

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        <input
  type="text"
  name="username"
  placeholder="Username"
  required
  value={formData.username}
  onChange={handleChange}
/>
<input
  type="email"
  name="email"
  placeholder="Email"
  required
  value={formData.email}
  onChange={handleChange}
/>
<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  required
  pattern="[0-9]{10}"
  value={formData.phone}
  onChange={handleChange}
/>
<input
  type="password"
  name="password"
  placeholder="Password"
  required
  value={formData.password}
  onChange={handleChange}
/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
