import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">FakeStore</h2>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">📘</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} FakeStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
