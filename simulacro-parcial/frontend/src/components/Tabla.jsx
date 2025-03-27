// Tabla.jsx
import { useEffect, useState } from 'react';

export default function Tabla() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/messages')
      //fetch('http://https://ss21s8f2-3000.use2.devtunnels.ms/api/messages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los mensajes');
        }
        return response.json();
      })
      .then(data => setMessages(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Mensajes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td>{msg.origin}</td>
              <td>{msg.destination}</td>
              <td>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
