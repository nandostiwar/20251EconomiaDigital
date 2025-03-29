import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './context/ContextoAutenticacion';
import InicioSesion from './pages/InicioSesion';
import Registro from './pages/Registro';
import SeleccionProducto from './pages/SeleccionProducto';
import FormularioCompra from './pages/FormularioCompra';
import ResultadoTransaccion from './pages/ResultadoTransaccion';
import PanelAdministrador from './pages/PanelAdministrador';
import PanelUsuario from './pages/PanelUsuario';
import './App.css';

function App() {
  return (
    <ProveedorAutenticacion>
      <Router>
        <Routes>
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/seleccion-producto" element={<SeleccionProducto />} />
          <Route path="/formulario-compra" element={<FormularioCompra />} />
          <Route path="/resultado-transaccion" element={<ResultadoTransaccion />} />
          <Route path="/panel-administrador" element={<PanelAdministrador />} />
          <Route path="/panel-usuario" element={<PanelUsuario />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ProveedorAutenticacion>
  );
}

export default App;