import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const Registro = () => {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [rol, setRol] = useState("usuario")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError("")

    if (contrasena !== confirmarContrasena) {
      return setError("Las contraseñas no coinciden")
    }

    setCargando(true)

    try {
      const endpoint = rol === 'admin'
        ? 'http://localhost:3000/api/users/newAdmin'
        : 'http://localhost:3000/api/users/newUser'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contrasena })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar')
      }

      iniciarSesion(data)
      navigate(data.rol === "admin" ? "/panel-administrador" : "/seleccion-producto")

    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }
  return (
    <div className="register-container">
      <div className="register-form">
      <center><h1>Bienvenido por primera vez</h1></center>
        <h2>Registro</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo de Cuenta</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="usuario"
                  checked={rol === "usuario"}
                  onChange={() => setRol("usuario")}
                />
                Usuario
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={rol === "admin"}
                  onChange={() => setRol("admin")}
                />
                Administrador
              </label>
            </div>
          </div>
          <center>
          <button className="subir1" type="submit" disabled={cargando}>
            {cargando ? "Creando Cuenta..." : "Registrarse"}
          </button>
          </center>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro