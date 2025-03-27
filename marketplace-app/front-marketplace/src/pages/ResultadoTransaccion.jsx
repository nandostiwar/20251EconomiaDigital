import { useLocation, useNavigate } from "react-router-dom"

const ResultadoTransaccion = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const resultado = state?.resultado

  if (!resultado) {
    navigate("/seleccion-producto")
    return null
  }

  const esExitoso = resultado.estado === "Aceptado"

  const manejarContinuarComprando = () => {
    navigate("/seleccion-producto")
  }

  const manejarVerHistorial = () => {
    navigate("/panel-usuario")
  }

  return (
    <div className={`transaction-result-container ${esExitoso ? "success" : "declined"}`}>
      <div className="transaction-result-card">
        <div className="result-header">
          <h2>{esExitoso ? "¡Pago Exitoso!" : "Pago Rechazado"}</h2>
          <div className={`status-icon ${esExitoso ? "success" : "declined"}`}>
            {esExitoso ? "✓" : "✗"}
          </div>
        </div>

        <div className="result-details">
          <div className="detail-item">
            <span className="detail-label">Estado:</span>
            <span className={`detail-value ${esExitoso ? "success-text" : "declined-text"}`}>
              {resultado.estado}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">ID de Transacción:</span>
            <span className="detail-value">{resultado._id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fecha:</span>
            <span className="detail-value">{new Date(resultado.fechaCompra).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Producto:</span>
            <span className="detail-value">{resultado.nombreProducto}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Monto:</span>
            <span className="detail-value">${resultado.valorProducto}</span>
          </div>
        </div>

        {!esExitoso && (
          <div className="declined-message">
            <p>Su pago fue rechazado. Por favor verifique los datos de su tarjeta e intente nuevamente.</p>
          </div>
        )}

        <div className="result-actions">
          <button className="primary-button" onClick={manejarContinuarComprando}>
            {esExitoso ? "Continuar Comprando" : "Intentar Nuevamente"}
          </button>
          <button className="secondary-button" onClick={manejarVerHistorial}>
            Ver Historial de Compras
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultadoTransaccion