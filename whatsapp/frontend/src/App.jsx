import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState(''); // Estado para el mensaje de error

  // Función para obtener los mensajes
  const fetchMensajes = async () => {
    const response = await fetch('http://localhost:5000/mensajes');
    const data = await response.json();
    setMensajes(data);
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  // Función para registrar usuario
  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar error antes de hacer la petición

    const registroData = { nombre, celular };

    try {
      const response = await fetch('http://localhost:5000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registroData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        setNombre('');
        setCelular('');
      } else {
        setError(data.error || 'Error al registrar usuario'); // Mostrar error en la UI
      }
    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
  };

  // Función para enviar mensaje
  const handleMensaje = async (e) => {
    e.preventDefault();
    setError('');

    const mensajesData = { origen, destino, mensaje };

    try {
      const response = await fetch('http://localhost:5000/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mensajesData),
      });

      if (response.ok) {
        fetchMensajes(); // Actualizar lista de mensajes
        alert('Mensaje enviado exitosamente');
        setOrigen('');
        setDestino('');
        setMensaje('');
      } else {
        setError('Error al enviar el mensaje');
      }
    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistro}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Celular" 
          value={celular} 
          onChange={(e) => setCelular(e.target.value)} 
          required 
        />
        <button type="submit">Registrar Usuario</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error en pantalla */}

      <h2>Enviar Mensaje</h2>
      <form onSubmit={handleMensaje}>
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
        <textarea 
          placeholder="Mensaje" 
          value={mensaje} 
          onChange={(e) => setMensaje(e.target.value)} 
          required 
        />
        <button type="submit">Enviar Mensaje</button>
      </form>

      <h3>Lista de Chat</h3>
      <ul>
        {mensajes.map((msg, index) => (
          <li key={index}>{msg.origen} le escribió a {msg.destino}: {msg.mensaje}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;