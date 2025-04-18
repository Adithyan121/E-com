import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import Search from './Search';
import { useAppContext } from '../context/AppContext';
import userImg from '../assets/user.png';
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaBoxOpen,
  FaUserCircle,
  FaSignInAlt,
  FaTimes,
} from 'react-icons/fa';

const Navbar = () => {
  const { cart, wishlist, logout } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));
    if (loginStatus && user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('login');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">FakeStore</Link>

        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <div className="search-container">
            <Search />
          </div>

          <Link to="/wishlist" className="nav-icon">
            <FaHeart />
            <span className="label">Wishlist</span>
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="nav-icon">
            <FaShoppingCart />
            <span className="label">Cart</span>
            {cart.length > 0 && <span className="count">{cart.length}</span>}
          </Link>

          <div className="user-box">
            <div className="user-info" onClick={toggleDropdown}>
              <img src={userImg} alt="User" className="user-img" />
            </div>

            {showDropdown && (
              <div className="dropdown">
                {isLoggedIn ? (
                  <>
                    <div className="dropdown-greeting">Hi, {currentUser?.username}</div>
                    <Link to="/account" className="dropdown-item"><FaUser /> Account</Link>
                    <Link to="/profile" className="dropdown-item"><FaUserCircle /> Profile</Link>
                    <Link to="/orders" className="dropdown-item"><FaBoxOpen /> Orders</Link>
                    <button onClick={handleLogout} className="dropdown-item logout-btn"><FaSignOutAlt /> Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="dropdown-item"><FaSignInAlt /> Login</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
