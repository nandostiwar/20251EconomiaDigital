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
        console.log("Datos recibidos en el frontend:", data); // <-- Agrega esto

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

  const manejarActualizar = async () => {
  setCargando(true);
  try {
    const response = await fetch(`http://localhost:3000/api/sales/actualizarUser/${usuarioActual._id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al actualizar');
    }

    setCompras(data); // Actualiza toda la lista de compras
  } catch (err) {
    setError(err.message);
  } finally {
    setCargando(false);
  }
};

  const manejarCerrarSesion = () => {
    cerrarSesion()
    navigate("/login")
  }

  const manejarNuevaCompra = () => {
    navigate("/seleccion-producto")
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
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h2>Historial de Compras</h2>
        <div className="user-info">
          <span>Usuario actual: {usuarioActual.nombre}</span>
          <button
                       className="refresh-button"
                      onClick={() => manejarActualizar(compras._id)}
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
                <th>Venta</th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Img</th>
                
              </tr>
            </thead>
            <tbody>
              {console.log("Compras en el estado:", compras)}
              {compras.map((compra) => (
                <tr key={compra._id} className={compra.estado === "Rechazado" ? "declined-row" : ""}>
                  <td>{new Date(compra.fechaCompra).toLocaleString()}</td>
                  <td>${compra.valor}</td>
                  <td>{compra.producto}</td>
                  <td className={compra.estado === "Completado" ? "status-accepted" : "status-declined"}>
                    {compra.estado}
                  </td>
                  <td>
                    <img 
                      src={imagenesProductos[compra.producto] || "/img/default.png"}  
                      alt={compra.producto} 
                      style={{ width: "80px", height: "30px" }}  
                     
                    />
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