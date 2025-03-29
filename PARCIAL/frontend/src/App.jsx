import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

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
      if (response.ok) {
        navigate('/compras'); // Redirige si el login es exitoso
      } else {
        alert(data.message); // Muestra el error si el login falla
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <h2>Marketplace</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Iniciar sesión</button>
        <button id="createUser" type="button" onClick={() => navigate('/crearUsuario')}>Crear Usuario</button>
        <button id="CreateAdmin" type="button" onClick={() => navigate('/crearAdmin')}>Crear Admin</button>
      </form>
    </div>
  );
}


function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(''); // Reinicia el error al intentar registrar

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message); // Muestra el mensaje de error del backend
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

function CrearAdmin() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Crear Administrador</h2>
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
      <p style={{ color: 'black' }}>¿Ya tienes una cuenta? <span className="link-text" onClick={() => navigate('/')}>Inicia Sesión</span></p>
    </div>
  );
}


function Compras() {
  const [producto, setProducto] = useState("");
  const [valor, setValor] = useState("");
  const [compras, setCompras] = useState([]);
  const [mostrarPasarela, setMostrarPasarela] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");
  const [ccv, setCcv] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagar = () => {
    if (producto && valor) {
      setMostrarPasarela(true); // Abre la pasarela de pago
    } else {
      setMensaje("⚠️ Ingresa el producto y el valor antes de pagar.");
    }
  };

  const procesarPago = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    if (!nombre || !cedula || !telefono || !tarjeta || !fechaVenc || !ccv) {
      setMensaje("⚠️ Completa todos los campos de pago.");
      return;
    }

    const pagoAprobado =
      tarjeta === "9858658998562541" && fechaVenc === "12/29" && ccv === "596";

    const nuevaCompra = {
      producto,
      valor,
      nombre,
      cedula,
      telefono,
      fecha: new Date().toISOString(),
      estado: pagoAprobado ? "Aprobado" : "Rechazado",
    };

    try {
      const response = await fetch("http://localhost:5000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCompra),
      });

      const data = await response.json();

      if (response.ok) {
        setCompras([...compras, nuevaCompra]); // Agrega la compra a la lista
        setMostrarPasarela(false); // Cierra la pasarela
        setMensaje(
          pagoAprobado
            ? `✅ Pago realizado con éxito por ${nombre} (${producto} - $${valor})`
            : "❌ Pago rechazado. Verifica los datos de tu tarjeta."
        );

        // Limpiar los datos
        setProducto("");
        setValor("");
        setNombre("");
        setCedula("");
        setTelefono("");
        setTarjeta("");
        setFechaVenc("");
        setCcv("");
      } else {
        setMensaje(`⚠️ Error en el pago: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("⚠️ Error en la conexión con el servidor.");
    }
  };

  const renderEstado = (estado) => {
    return (
      <span className={estado === "Aprobado" ? "estado-aprobado" : "estado-rechazado"}>
        {estado}
      </span>
    );
  };

  return (
    <div className="compras-container">
      <h2>Marketplace - Compras</h2>
      <input type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} />
      <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
      <button onClick={handlePagar}>Pagar</button>
      {mensaje && <p>{mensaje}</p>}

      <h3>Historial de Compras</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Valor</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.producto}</td>
              <td>${compra.valor}</td>
              <td>{compra.fecha}</td>
              <td>{compra.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pasarela de pago como modal */}
      {mostrarPasarela && (
        <div className="modal">
          <div className="modal-content">
            <h2>Formulario de Pago</h2>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            <input type="text" placeholder="Número de tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />
            <input type="text" placeholder="Fecha Venc (MM/AA)" value={fechaVenc} onChange={(e) => setFechaVenc(e.target.value)} />
            <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} />
            <button type="submit" onClick={procesarPago}>Confirmar Pago</button>
            <button onClick={() => setMostrarPasarela(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crearUsuario" element={<CrearUsuario />} />
        <Route path="/crearAdmin" element={<CrearAdmin />} />
        <Route path="/compras" element={<Compras />} />
      </Routes>
    </Router>
  );
}

export default App;
