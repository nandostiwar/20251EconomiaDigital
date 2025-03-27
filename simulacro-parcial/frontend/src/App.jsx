import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './components/Registro.jsx';
import Mensaje from './components/Mensaje.jsx';
import Tabla from './components/Tabla.jsx';

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <h1>Mini WhatsApp</h1>
        <nav className="mb-4 flex space-x-4">
          <Link to="/registro" className="px-4 py-2 bg-blue-500 text-white rounded">Registro</Link>
          <Link to="/mensaje" className="px-4 py-2 bg-green-500 text-white rounded">Enviar Mensaje</Link>
          <Link to="/tabla" className="px-4 py-2 bg-gray-500 text-white rounded">Mensajes</Link>
        </nav>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/mensaje" element={<Mensaje />} />
          <Route path="/tabla" element={<Tabla />} />
        </Routes>
      </div>
    </Router>
  );
}
