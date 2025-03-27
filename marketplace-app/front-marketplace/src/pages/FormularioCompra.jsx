import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const FormularioCompra = () => {
  const [detallesProducto, setDetallesProducto] = useState(null)
  const [nombreCompleto, setNombreCompleto] = useState("")
  const [numeroCedula, setNumeroCedula] = useState("")
  const [telefono, setTelefono] = useState("")
  const [numeroTarjeta, setNumeroTarjeta] = useState("")
  const [fechaVencimiento, setFechaVencimiento] = useState("")
  const [cvv, setCvv] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const { usuarioActual } = useAuth()

  useEffect(() => {
    const detallesAlmacenados = sessionStorage.getItem("detallesProducto")
    if (!detallesAlmacenados) {
      navigate("/seleccion-producto")
      return
    }
    setDetallesProducto(JSON.parse(detallesAlmacenados))
  }, [navigate])

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError("")

    if (!nombreCompleto.trim() || !numeroCedula.trim() || !telefono.trim() ||
      !numeroTarjeta.trim() || !fechaVencimiento.trim() || !cvv.trim()) {
      return setError("Todos los campos son obligatorios")
    }

    setCargando(true)

    try {
      const response = await fetch('http://localhost:3000/api/sales/nuevaVenta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: usuarioActual._id,
          nombreProducto: detallesProducto.nombre,
          valorProducto: detallesProducto.valor,
          nombre: nombreCompleto,
          cedula: numeroCedula,
          telefono,
          tarjeta: numeroTarjeta.replace(/\s/g, ''),
          fechaVencimiento,
          cvv
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago')
      }

      navigate("/resultado-transaccion", {
        state: {
          resultado: {
            ...data,
            nombreProducto: detallesProducto.nombre,
            valorProducto: detallesProducto.valor
          }
        }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  if (!detallesProducto) {
    return <div>Cargando...</div>
  }

  return (
    <div className="purchase-form-container">
      <div className="purchase-form-header">
        <h2>Complete su Compra</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="purchase-details">
        <div className="detail-item">
          <span className="detail-label">Producto:</span>
          <span className="detail-value">{detallesProducto.nombre}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Precio:</span>
          <span className="detail-value">${detallesProducto.valor}</span>
        </div>
      </div>

      <div className="purchase-form">
        <form onSubmit={manejarEnvio}>
          <div className="form-section">
            <h3>Información Personal</h3>
            <div className="form-group">
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <input
                type="text"
                id="nombreCompleto"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numeroCedula">Número de Cédula</label>
              <input
                type="text"
                id="numeroCedula"
                value={numeroCedula}
                onChange={(e) => setNumeroCedula(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Número de Teléfono</label>
              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Información de Pago</h3>
            <div className="form-group">
              <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
              <input
                type="text"
                id="numeroTarjeta"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                placeholder="9858 6589 9856 2541"
                maxLength="19"
                required
              />
              <small>Tarjeta válida: 9858 6589 9856 2541</small>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                <input
                  type="text"
                  id="fechaVencimiento"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                  placeholder="12/29"
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="596"
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={cargando}>
            {cargando ? "Procesando..." : "Completar Compra"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioCompra