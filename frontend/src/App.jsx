import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/2-Login.jsx';
import Register from './Components/1-register.jsx';
import ProductGrid from './Components/3-ProductGrid.jsx'; // Importing ProductGrid

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductGrid />} /> {/* Route for ProductGrid */}
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Fallback for unmatched routes */}
      </Routes>
    </Router>
  );
}

export default App;
