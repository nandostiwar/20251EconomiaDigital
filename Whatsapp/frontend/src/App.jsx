import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');

  const [mensajes, setMensajes] = useState([]);

  // Función para obtener los mensajes
  const fetchMensajes = async () => {
    const response = await fetch('http://localhost:5000/mensajes');
    const data = await response.json();
    setMensajes(data);
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  // Manejar registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono })
      });

      if (response.ok) {
        setNombre('');
        setTelefono('');
      } else {
        console.error("Error en el registro del usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Manejar envío de mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origen, destino, mensaje })
      });

      if (response.ok) {
        fetchMensajes(); // Actualizar la lista
        setOrigen('');
        setDestino('');
        setMensaje('');
      } else {
        console.error("Error en la respuesta del servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2>Whatsapp</h2>
      
      {/* Sección de Registro */}
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
        />
        <button type="submit">Registrar</button>
      </form>
      
      {/* Sección de Mensaje */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Enviar</button>
      </form>

      {/* Lista de Mensajes */}
      <h3>Lista de Mensajes</h3>
      <ul>
        {mensajes.map((msg, index) => (
          <li key={index}>{msg.origen} a {msg.destino}: {msg.mensaje}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
