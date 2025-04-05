import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const rol = 'User'; 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rol })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      alert('Usuario creado con éxito');
      navigate('/');
    } catch (error) {
      setError('Error en la solicitud');
    }
  };

  return (
    <div className="container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleCreate}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ color: 'black' }}>¿Ya tienes una cuenta? <span className="link-text" onClick={() => navigate('/')}>Inicia Sesión</span></p>
    </div>
  );
}

export default CrearUsuario;
