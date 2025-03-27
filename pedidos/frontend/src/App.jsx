import React, { useState } from 'react';
import Ventas from './Ventas';
import Clientes from './Clientes';

function App() {
  const [view, setView] = useState('ventas');

  return (
    <div>
      <h1>Gestión de Ventas y Clientes</h1>
      <button onClick={() => setView('ventas')}>Formulario Ventas</button>
      <button onClick={() => setView('clientes')}>Formulario Clientes</button>

      {view === 'ventas' ? <Ventas /> : <Clientes />}
    </div>
  );
}

export default App;

