import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './styles/CreateVenta.css';

const CreateVenta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { producto, valor } = location.state || { producto: '', valor: '' };

  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [fechaV, setFechaV] = useState('');
  const [ccv, setCcv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/v1/drivers/ventas', {
        producto,
        valor,
        nombre,
        cedula,
        telefono,
        tarjeta,
        fechaV,
        ccv,
      });
      alert('Venta registrada exitosamente');
      navigate('/userHome');
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Error al registrar la venta');
    }
  };

  return (
    <div className='create-venta'>
      <h1>Registrar Venta</h1>
      <form onSubmit={handleSubmit}>
        <label>Producto:</label>
        <input type='text' value={producto} disabled />

        <label>Valor:</label>
        <input type='text' value={valor} disabled />

        <label>Nombre:</label>
        <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Cédula:</label>
        <input type='number' value={cedula} onChange={(e) => setCedula(e.target.value)} required />

        <label>Teléfono:</label>
        <input type='number' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

        <label>Tarjeta:</label>
        <input type='text' value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} required />

        <label>Fecha Venc:</label>
        <input type='text' value={fechaV} onChange={(e) => setFechaV(e.target.value)} required />

        <label>CCV:</label>
        <input type='text' value={ccv} onChange={(e) => setCcv(e.target.value)} required className="form-group" />

        <div className="button-group">
          <button type="button" onClick={() => navigate('/UserHome')}>Regresar</button>
          <button type='submit'>Confirmar Pago</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenta;