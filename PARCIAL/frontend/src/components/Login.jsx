import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Redireccionar por rol
      if (data.rol === 'User') {
        navigate('/compras');
      } else if (data.rol === 'Admin') {
        navigate('/admin');
      } else {
        setError('Rol no reconocido.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <h2>Marketplace</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => navigate('/crearUsuario')}>Crear Usuario</button>
        <button type="button" onClick={() => navigate('/crearAdmin')}>Crear Admin</button>
      </form>
    </div>
  );
}

export default Login;
