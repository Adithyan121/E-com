import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Purchase from './pages/Purchase';
import SearchDetails from './pages/SearchDetails';

import { AppProvider } from './context/AppContext';
import CheckoutFlow from './pages/CheckoutFlow';
import Account from './pages/Account';
import Order from './pages/Order';
import Profile from './pages/Profile';

// PrivateRoute component that checks if the user is logged in
const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('login') === 'true'; // Adjust this to match your login check
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
            <Route path="/wishlist" element={<PrivateRoute element={<Wishlist />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/purchase" element={<PrivateRoute element={<Purchase />} />} />
            <Route path="/search/:query" element={<SearchDetails />} />
            <Route path="/checkout" element={<PrivateRoute element={<CheckoutFlow />} />} />
            <Route path="/account" element={<PrivateRoute element={<Account />} />} />
            <Route path="/orders" element={<PrivateRoute element={<Order />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
