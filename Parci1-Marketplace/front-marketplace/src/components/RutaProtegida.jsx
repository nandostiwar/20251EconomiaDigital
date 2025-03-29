// RutaProtegida.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/ContextoAutenticacion"

const RutaProtegida = ({ children, requiereAdmin = false }) => {
  const { usuarioActual, cargando } = useAuth()

  if (cargando) {
    return <div>Cargando...</div>
  }

  if (!usuarioActual) {
    return <Navigate to="/login" />
  }

  if (requiereAdmin && usuarioActual.rol !== "admin") {
    return <Navigate to="/panel-usuario" />
  }

  return children
}

export default RutaProtegida

