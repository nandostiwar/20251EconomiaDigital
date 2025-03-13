import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cedula, setCedula] = useState('');

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
      //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, producto })
    });
    
    const usuarioresponse = await fetch('http://localhost:5000/usuario', {
      //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, telefono, direccion, cedula })
    });

  

    if (response.ok && usuarioresponse.ok) {
      fetchVentas(); // Actualizar la lista
      setNombre('');
      setProducto('');
      setCorreo('');
      setTelefono('');
      setDireccion('');
      setCedula('');
    }
  };

  return (
    <div>
      <h2>Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Producto" 
          value={producto} 
          onChange={(e) => setProducto(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          required 
        />
        <input 
         type="text" 
          placeholder="Telefono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
       />
       <input 
         type="text" 
          placeholder="Dirreccion" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
          required 
       />
       <input 
         type="text" 
          placeholder="Cedula" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          required 
       />
       
        <button type="submit">Enviar</button>
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
