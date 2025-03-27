// mensaje.jsx

import { useState } from 'react';

export default function Mensaje() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSend = async () => {
    const response = await fetch('http://localhost:3000/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, message })
    });
    const data = await response.json();
    setResponseMessage(data.message);
  };

  return (
    <div>
      <h2>Enviar Mensaje</h2>
      <input type="text" placeholder="Origen" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      <input type="text" placeholder="Destino" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input type="text" placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Enviar</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
