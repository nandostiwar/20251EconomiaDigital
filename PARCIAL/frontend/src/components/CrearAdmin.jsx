import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const rol = 'Admin';
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

      alert('Administrador creado con éxito');
      navigate('/admin');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud');
    }
  };

  return (
    <div className="container">
      <h2>Crear Administrador</h2>
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

export default CrearAdmin;
