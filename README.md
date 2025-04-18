## 🏍️ E-Commerce React App

This is a modern, responsive **E-Commerce web application** built using **React.js**. It provides a complete shopping experience with features like product browsing, cart and wishlist management, a simulated checkout system, and order tracking. The app uses **React Context API** for state management and **LocalStorage** for data persistence.

---

### 🔧 Tech Stack

- **Frontend:** React.js, React Router
- **State Management:** Context API
- **Styling:** Plain CSS
- **Storage:** LocalStorage (for cart, wishlist, user data, and orders)

---

### ✨ Features

#### 👥 User Authentication

- Login and Signup pages
- Auth-based route protection
- Redirects unauthorized users to the login page

#### 🏠 Home Page

- Product grid with images, prices, and links to detail view

#### 📄 Product Details

- Detailed info page for each product
- Add to cart or wishlist

#### ❤️ Wishlist

- View and manage favorite items

#### 🛒 Cart

- Add/remove items
- View total and proceed to checkout

#### 💸 Checkout Simulation

- Simulates the checkout process
- Saves orders into `localStorage` with a date
- Mimics a real-world purchase flow

#### 📦 Orders Page

- Displays previously "purchased" orders
- Shows products, prices in INR, and order dates

#### 🔍 Search

- Search products by keyword via URL parameters

#### 👤 Account & Profile (Basic)

- Placeholder pages for future user settings and info

---

### 🔐 Route Protection

The following routes are **protected** and accessible only if the user is logged in (`localStorage.getItem("login") === "true"`):

- `/cart`
- `/wishlist`
- `/purchase`
- `/checkout`
- `/account`
- `/orders`
- `/profile`

Unauthenticated users are redirected to `/login`.

---
