import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const PanelAdministrador = () => {
  const [compras, setCompras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { usuarioActual, cerrarSesion } = useAuth()

  useEffect(() => {
    const obtenerTodasLasCompras = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sales');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar compras');
        }

        // Formatear los datos para mantener consistencia con el diseño
        const comprasFormateadas = data.map(compra => ({
          _id: compra._id,
          fechaCompra: compra.fechaCompra,
          nombre: compra.nombreUsuario, // Usamos el nombre poblado desde el backend
          producto: compra.producto,
          valor: compra.valor,
          estado: compra.estado,
          correoUsuario: compra.correoUsuario // Agregado para referencia
        }));

        setCompras(comprasFormateadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerTodasLasCompras();
  }, []);

  const manejarActualizarEstado = async (compraId, estadoActual) => {
    setCargando(true)
    try {
      const nuevoEstado = estadoActual === "Aceptado" ? "Declinado" : "Aceptado"

      const response = await fetch(`http://localhost:3000/api/sales/actualizarAdmin/${compraId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar')
      }

      setCompras(compras.map(c => c._id === compraId ? data : c))
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const manejarCerrarSesion = () => {
    cerrarSesion()
    navigate("/login")
  }

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2>Panel de Administrador</h2>
        <div className="user-info">
          <span>Administrador: {usuarioActual.nombre}</span>
          <button className="logout-button" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="purchases-table-container">
        {cargando ? (
          <div className="loading">Cargando datos de compras...</div>
        ) : compras.length === 0 ? (
          <div className="no-purchases">
            <p>No se encontraron registros de compras.</p>
          </div>
        ) : (
          <table className="purchases-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Producto</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra._id} className={compra.estado === "Declinado" ? "declined-row" : ""}>
                  <td>{new Date(compra.fechaCompra).toLocaleString()}</td>
                  <td>{compra.nombre}</td>
                  <td>{compra.producto}</td>
                  <td>${compra.valor}</td>
                  <td className={compra.estado === "Aceptado" ? "status-accepted" : "status-declined"}>
                    {compra.estado}
                  </td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => manejarActualizarEstado(compra._id, compra.estado)}
                      disabled={cargando}
                    >
                      Cambiar Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PanelAdministrador