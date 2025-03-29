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
      const nuevoEstado = estadoActual === "Completado" ? "Rechazado" : "Completado"

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

  const imagenesProductos = {
    Snickers: "/img/snickers.png",
    Oreo: "/img/Oreo.jpg",
    Hersheys: "/img/Hersheys.png",
    Doritos: "/img/doritos.png",
    Chocoramo: "/img/chocorramo.png",
    Trident: "/img/trident.png",
    MyMs: "/img/m&ms.png",
    TridentRosa: "/img/trident_pink.png",
    Jumbo: "/img/jumbo.jpg",
    Tilapia: "/img/tilapia.png",
    Teclado: "/img/teclado.png"
  };


  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2>Nickstuff Admin</h2>
        <div className="user-info">
          <span>Administrador: {usuarioActual.nombre}</span>
          <button
                      className="refresh-button"
                      onClick={() => manejarActualizarEstado(compras._id)}
                      disabled={cargando}
                    >
                       <img className="img" src="/img/refresh.png" alt="Actualizar" style={{ width: "15px", height: "15px" }} />
                      Actualizar
                    </button>
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
                <th>Venta</th>
                <th>Producto</th>
                <td>Visual</td>
                <th>Estado</th>
               
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra._id} className={compra.estado === "Rechazado" ? "declined-row" : ""}>
                  <td>{new Date(compra.fechaCompra).toLocaleString()}</td>
                  <td>{compra.correoUsuario}</td>
                  <td>${compra.valor}</td>
                  <td>{compra.producto}</td>
                  <td>
                    <img 
                      src={imagenesProductos[compra.producto] || "/img/default.png"}  
                      alt={compra.producto} 
                      style={{ width: "80px", height: "30px" }}  
                     
                    />
                  </td>
                  
                  <td className={compra.estado === "Completado" ? "status-accepted" : "status-declined"}>
                    {compra.estado}
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