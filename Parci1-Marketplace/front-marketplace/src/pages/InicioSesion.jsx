import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const InicioSesion = () => {
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      })

      const data = await response.json()

      if (!response.ok) {
        // Mensaje personalizado según el error
        if (data.error.includes('no registrada')) {
          throw new Error(data.error + ' Deberías Registrarte.')
        } else {
          throw new Error(data.error)
        }
      }

      iniciarSesion(data)

      // Redirección según rol
      navigate(data.rol === "admin" ? "/panel-administrador" : "/seleccion-producto")

    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <center><h1>Bienvenido de nuevo</h1></center>
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <center>
          <button className="subir1" type="submit" disabled={cargando}>
            {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
          </center>
        </form>
        <p className="register-link">
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default InicioSesion