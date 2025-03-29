import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function RegisterAdmin() {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registrando admin:", adminName);
    // Aquí iría la lógica para registrar el admin en el backend
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Admin</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Ingrese un nombre de admin"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        <div className="login-link">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
