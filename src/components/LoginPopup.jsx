
import React, { useState } from 'react';
import '../css/Auth.css';
import '../css/LoginPopup.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const storedUser = JSON.parse(localStorage.getItem('user'));

  //   if (
  //     storedUser &&
  //     formData.username === storedUser.username &&
  //     formData.password === storedUser.password
  //   ) {
  //     login(formData);
  //     localStorage.setItem('login', true);
  //     alert('Login successful!');
  //     window.location.href = '/';
  //     onClose(); // Close the modal
  //     navigate('/');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (
      storedUser &&
      formData.username === storedUser.username &&
      formData.password === storedUser.password
    ) {
      // login(formData);
      localStorage.setItem('login', true);
      
      alert('Login successful!');
  
      // Refresh the browser after login
      window.location.href = '/'; 
  
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p className="signup-redirect">
            Don't have an account? <Link to="/signup" onClick={onClose}>Signup</Link>
          </p>
          <button type="button" className="close-btn" onClick={onClose}>✖</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
