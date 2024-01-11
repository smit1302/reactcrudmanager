import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import './App.css';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';

function App() {
  return (
    <Routes>
     
    <Route path="/" element={<LoginPage />} />
    <Route path="HomePage" element={<HomePage />} />
    <Route path="ProductPage" element={<ProductPage />} />
  </Routes>
  );
}

export default App;
