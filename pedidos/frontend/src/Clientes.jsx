import React, { useState, useEffect } from 'react';

function Clientes() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clientes');
      if (!response.ok) throw new Error('Error al obtener clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al registrar cliente');

      fetchClientes();
      setFormData({ nombre: '', direccion: '', telefono: '', correo: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h3>Lista de Clientes</h3>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nombre}, Dirección: {cliente.direccion}, Tel: {cliente.telefono}, Correo: {cliente.correo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
