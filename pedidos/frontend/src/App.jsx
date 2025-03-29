import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
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
    const ventasresponse = await fetch('http://localhost:5000/ventas', {
      //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, producto })
    });

    const datosresponse = await fetch('http://localhost:5000/datos', {
      //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, cedula, correo, direccion,telefono })
    });

    

    if (ventasresponseresponse.ok  &&  datosresponse.ok) {
      fetchVentas(); // Actualizar la lista
      setNombre('');
      setProducto('');
      setCedula('');
      setCorreo('');
      setDireccion('');
      setTelefono('');
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
          placeholder="Cedula" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
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
          placeholder="Direccion" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Telefono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
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
