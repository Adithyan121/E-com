import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Add this useEffect to sync cart with localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('login');
    window.location.href = '/';
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
