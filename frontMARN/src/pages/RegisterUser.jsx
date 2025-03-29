import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function RegisterUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registrando usuario:", username);
    // Aquí iría la lógica para registrar el usuario en el backend
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Usuario</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Ingrese un nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default RegisterUser;
