import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const PanelUsuario = () => {
  const [compras, setCompras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { usuarioActual, cerrarSesion } = useAuth()

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/sales/actualizarUser/${usuarioActual._id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar compras');
        }

        // Formatear los datos para mantener consistencia con el diseño
        const comprasFormateadas = data.map(compra => ({
          _id: compra._id,
          fechaCompra: compra.fechaCompra,
          producto: compra.producto,
          valor: compra.valor,
          estado: compra.estado
        }));

        setCompras(comprasFormateadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    if (usuarioActual) obtenerCompras();
  }, [usuarioActual]);
  const manejarActualizar = async (compraId) => {
    setCargando(true)
    try {
      const response = await fetch(`http://localhost:3000/api/sales/actualizarUser/${compraId}`)
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

  const manejarNuevaCompra = () => {
    navigate("/seleccion-producto")
  }

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h2>Historial de Compras</h2>
        <div className="user-info">
          <span>Bienvenido, {usuarioActual.nombre}</span>
          <button className="logout-button" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-actions">
        <button className="new-purchase-button" onClick={manejarNuevaCompra}>
          Nueva Compra
        </button>
      </div>

      <div className="purchases-table-container">
        {cargando ? (
          <div className="loading">Cargando historial de compras...</div>
        ) : compras.length === 0 ? (
          <div className="no-purchases">
            <p>Aún no has realizado ninguna compra.</p>
          </div>
        ) : (
          <table className="purchases-table">
            <thead>
              <tr>
                <th>Fecha</th>
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
                  <td>{compra.producto}</td>
                  <td>${compra.valor}</td>
                  <td className={compra.estado === "Aceptado" ? "status-accepted" : "status-declined"}>
                    {compra.estado}
                  </td>
                  <td>
                    <button
                      className="refresh-button"
                      onClick={() => manejarActualizar(compra._id)}
                      disabled={cargando}
                    >
                      Actualizar
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

export default PanelUsuario