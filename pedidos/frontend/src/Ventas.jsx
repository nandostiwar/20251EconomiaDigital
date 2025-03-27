import React, { useState, useEffect } from 'react';

function Ventas() {
  const [formData, setFormData] = useState({
    nombre: '',
    producto: ''
  });

  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ventas');
      if (!response.ok) throw new Error('Error al obtener ventas');
      const data = await response.json();
      setVentas(data);
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
      const response = await fetch('http://localhost:3000/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al enviar la venta');

      fetchVentas();
      setFormData({ nombre: '', producto: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
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
          name="producto"
          placeholder="Producto"
          value={formData.producto}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <h3>Lista de Ventas</h3>
      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>
            {venta.nombre} compró {venta.producto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ventas;
