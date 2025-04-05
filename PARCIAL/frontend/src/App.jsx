import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CrearUsuario from './components/CrearUsuario';
import CrearAdmin from './components/CrearAdmin';
import Compras from './components/Compras';
import AdminDashboard from "./components/AdminDashboard";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crearUsuario" element={<CrearUsuario />} />
        <Route path="/crearAdmin" element={<CrearAdmin />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
