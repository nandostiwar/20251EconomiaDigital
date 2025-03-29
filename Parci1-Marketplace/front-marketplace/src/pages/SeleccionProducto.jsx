import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const SeleccionProducto = () => {
  const [nombreProducto, setNombreProducto] = useState("")
  const [valorProducto, setValorProducto] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { usuarioActual } = useAuth()

  const manejarEnvio = (e) => {
    e.preventDefault()
    setError("")

    if (!nombreProducto.trim()) {
      return setError("Por favor ingrese un nombre de producto")
    }

    if (!valorProducto || isNaN(Number(valorProducto)) || Number(valorProducto) <= 0) {
      return setError("Por favor ingrese un valor de producto válido")
    }

    sessionStorage.setItem(
      "detallesProducto",
      JSON.stringify({
        nombre: nombreProducto,
        valor: valorProducto,
      })
    )

    navigate("/formulario-compra")
  }

  return (
    <div className="product-selection-container">
      <div className="product-selection-header">
        <h2>Bienvenido(a), {usuarioActual.nombre}</h2>
        <p>Seleccione un producto para comprar</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="product-selection-form">
        <form onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="nombreProducto">Nombre del Producto</label>
            <input
              type="text"
              id="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="valorProducto">Valor del Producto (COP)</label>
            <input
              type="number"
              id="valorProducto"
              value={valorProducto}
              onChange={(e) => setValorProducto(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>
          <button type="submit" className="pay-button">
            Pagar
          </button>
        </form>
      </div>

      <div className="view-history-link">
        <button onClick={() => navigate("/panel-usuario")}>
          Ver Historial de Compras
        </button>
      </div>
    </div>
  )
}

export default SeleccionProducto