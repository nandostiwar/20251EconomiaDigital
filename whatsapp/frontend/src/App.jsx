import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [producto, setProducto] = useState('');
  const [ventas, setVentas] = useState([]);

  // Función para obtener las ventas
  const fetchVentas = async () => {
    const response = await fetch('http://localhost:5000/ventas');
    //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas');
    const data = await response.json();
    setVentas(data);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/ventas', {
     // const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, direccion, telefono, correo, producto })
    });

    if (response.ok) {
      fetchVentas(); // Actualizar la lista
      setNombre('');
      setDireccion('');
      setTelefono('');
      setCorreo('');
      setProducto('');
      
    }
  };

  return (
    <div >
      <h2>Whatsapp FAKE</h2>
      <form  onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Telefono" 
          value={nombre} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
        />
        <p><input 
          type="text" 
          placeholder="Nombre" 
          value={direccion} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        </p>
        <button type="submit">Registrar</button>
        <form action=""></form>
        <p>
        <input 
          type="text" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
        />
        </p>
        <p>
        <input 
          type="text" 
          placeholder="Correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          required 
        />
        </p>
        <input 
          type="text" 
          placeholder="Producto" 
          value={producto} 
          onChange={(e) => setProducto(e.target.value)} 
          required 
        />
        
      </form>



      <h3>Lista de Ventas</h3>
      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>{venta.nombre} compró {venta.producto}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
