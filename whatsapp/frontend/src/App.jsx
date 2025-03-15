import "./style.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Cargar mensajes existentes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleRegister = async () => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("Por favor ingresa tu nombre y celular.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario.");
    }
  };

  const handleSendMessage = async () => {
    if (name.trim() === "" || recipient.trim() === "" || message.trim() === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    const newMessage = {
      sender: name,
      recipient,
      content: message,
    };

    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages([...messages, data.data]);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Error al enviar mensaje.");
    }

    setMessage("");
  };

  return (
    <div className="container">
      <h1>Registro y Envío de Mensajes</h1>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Celular:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Registrar</button>
      <br />
      <div className="form-group">
        <label>Destinatario:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Mensaje:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={handleSendMessage}>Enviar</button>
      <br />
      <h2>Mensajes Enviados</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            <strong>De:</strong> {msg.sender} | <strong>Para:</strong> {msg.recipient} | <strong>Mensaje:</strong> {msg.content} | <strong>Estado:</strong> {msg.status}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default App;
