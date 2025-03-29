import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/UserHome.css';

const fetchCodes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/v1/drivers/Venta');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los códigos:', error);
    return [];
  }
};

function UserHome() {
  const [user, setUser] = useState({ nombre: '', correo: '', numeroCelular: '', ciudad: '' });
  const [producto, setProducto] = useState('');
  const [valor, setValor] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
    const loadCodes = async () => {
      const codesData = await fetchCodes();
      setCodes(codesData);
    };
    loadCodes();
  }, []);

  const handlePayment = () => {
    navigate('/createVenta', { state: { producto, valor } });
  };

  return (
    <div className='allUserHome'>
      <div className="user-home">
        <header className="header">
          <img src="/logo.png" alt="MarketPlace" className="logo" />
          <nav>
            <button onClick={() => navigate('/ChangePassword')}>Cambiar Contraseña</button>
            <button onClick={() => navigate('/')}>Cerrar Sesión</button>
          </nav>
        </header>

        <main className="main-content">
          <h1 className="welcome">¡Bienvenido {user.nombre}!</h1>
          <section className="user-info">
            <h2>Información del Usuario</h2>
            <table>
              <tbody>
                <tr><td>Nombre:</td><td>{user.nombre}</td></tr>
                <tr><td>Correo:</td><td>{user.correo}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="registrar-codigo">
            <h2>Registrar Nueva Compra</h2>
            <label>Producto:</label>
            <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} required placeholder="Nuevo producto" />

            <label>Valor:</label>
            <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} required placeholder="Valor del producto" />

            <button onClick={handlePayment} className="submit-btn">Pagar</button>
          </section>

          <section className="code-list">
            <h2>Historial de Compras</h2>
            <table>
              <thead>
                <tr><th>Fecha de Registro</th><th>Número de Código</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {codes.map((code, index) => (
                  <tr key={index}><td>{code.fechaRegistro}</td><td>{code.numeroCodigo}</td><td>{code.estado}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Gana Como Loco Colombia. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default UserHome;