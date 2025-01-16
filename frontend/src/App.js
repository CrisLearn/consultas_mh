// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Otras rutas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
