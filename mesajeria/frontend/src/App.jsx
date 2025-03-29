import React, { useState, useEffect } from 'react';

// Componente para los datos de contacto
function ContactForm({ telefono, setTelefono, nombre, setNombre, handleUserSubmit }) {
  return (
    <div>
      <h2>Datos de Contacto</h2>
      <form onSubmit={handleUserSubmit}>
        <input 
          type="text" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <button type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
}

// Componente para los datos del pedido
function OrderForm({ origen, setOrigen, destino, setDestino, mensaje, setMensaje, handleOrderSubmit }) {
  return (
    <div>
      <h2>Detalles del Pedido</h2>
      <form onSubmit={handleOrderSubmit}>
        <input 
          type="text" 
          placeholder="Origen" 
          value={origen} 
          onChange={(e) => setOrigen(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Destino" 
          value={destino} 
          onChange={(e) => setDestino(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Mensaje" 
          value={mensaje} 
          onChange={(e) => setMensaje(e.target.value)} 
          required 
        />
        <button type="submit">Enviar Pedido</button>
      </form>
    </div>
  );
}

// Componente principal
function App() {
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);

  // Obtener datos desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));

    fetch('http://localhost:5000/mensajes')
      .then(res => res.json())
      .then(data => setMensajes(data));
  }, []);

  // Manejar envío de usuario
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono, nombre })
    });
    if (response.ok) {
      setTelefono('');
      setNombre('');
    }
  };

  // Manejar envío de pedido
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/mensajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origen, destino, mensaje })
    });
    if (response.ok) {
      setOrigen('');
      setDestino('');
      setMensaje('');
    }
  };

  return (
    <div>
      <ContactForm 
        telefono={telefono} setTelefono={setTelefono} 
        nombre={nombre} setNombre={setNombre} 
        handleUserSubmit={handleUserSubmit} 
      />

      <OrderForm 
        origen={origen} setOrigen={setOrigen} 
        destino={destino} setDestino={setDestino} 
        mensaje={mensaje} setMensaje={setMensaje} 
        handleOrderSubmit={handleOrderSubmit} 
      />

      <h3>Lista de Usuarios Registrados</h3>
      <ul>{usuarios.map((u, index) => <li key={index}>{u.telefono} - {u.nombre}</li>)}</ul>

      <h3>Lista de Pedidos</h3>
      <ul>{mensajes.map((m, index) => <li key={index}>{m.origen} → {m.destino}: {m.mensaje}</li>)}</ul>
    </div>
  );
}

export default App;
