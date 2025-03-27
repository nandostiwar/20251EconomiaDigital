// Registo.jsx
import { useState } from 'react';

export default function Registro() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, name })
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h2>Registro</h2>
            <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>
            {message && <p>{message}</p>}
        </div>
    );
}
