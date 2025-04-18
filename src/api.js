// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Products
export const getAllProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductsByCategory = (category) => API.get(`/products/category/${category}`);

// Categories
export const getAllCategories = () => API.get('/products/categories');

// Users (Fake Login)
export const loginUser = (credentials) => API.post('/auth/login', credentials);

// Cart (Fake)
export const getUserCart = (userId) => API.get(`/carts/user/${userId}`);
export const addToCart = (cartData) => API.post('/carts', cartData);

export default API;
