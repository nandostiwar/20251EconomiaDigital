import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    navigate("/message");
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

const MessageForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, message }),
    });
    navigate("/view-messages");
  };

  return (
    <div>
      <h2>Enviar Mensaje</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Origen" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
        <input type="text" placeholder="Destino" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <textarea placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div>
      <h2>Mensajes Enviados</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>Origen:</strong> {msg.origin} - <strong>Destino:</strong> {msg.destination} - <strong>Mensaje:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/message" element={<MessageForm />} />
        <Route path="/view-messages" element={<ViewMessages />} />
      </Routes>
    </Router>
  );
};

export default App;
