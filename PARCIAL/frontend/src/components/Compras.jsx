import React, { useState } from 'react';

function Compras() {
  const [producto, setProducto] = useState("");
  const [valor, setValor] = useState("");
  const [compras, setCompras] = useState([]);
  const [mostrarPasarela, setMostrarPasarela] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");
  const [ccv, setCcv] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagar = () => {
    if (producto && valor) {
      setMostrarPasarela(true);
    } else {
      setMensaje("⚠️ Ingresa el producto y el valor antes de pagar.");
    }
  };

  const procesarPago = async (e) => {
    e.preventDefault();

    if (!nombre || !cedula || !telefono || !tarjeta || !fechaVenc || !ccv) {
      setMensaje("⚠️ Completa todos los campos de pago.");
      return;
    }

    const pagoAprobado =
      tarjeta === "9858658998562541" && fechaVenc === "12/29" && ccv === "596";

    const nuevaCompra = {
      producto,
      valor,
      nombre,
      cedula,
      telefono,
      fecha: new Date().toISOString(),
      estado: pagoAprobado ? "Aprobado" : "Rechazado",
    };

    try {
      const response = await fetch("http://localhost:5000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCompra),
      });

      const data = await response.json();

      if (response.ok) {
        setCompras([...compras, nuevaCompra]);
        setMostrarPasarela(false);
        setMensaje(
          pagoAprobado
            ? `✅ Pago realizado con éxito por ${nombre} (${producto} - $${valor})`
            : "❌ Pago rechazado. Verifica los datos de tu tarjeta."
        );

        // Limpiar los datos
        setProducto("");
        setValor("");
        setNombre("");
        setCedula("");
        setTelefono("");
        setTarjeta("");
        setFechaVenc("");
        setCcv("");
      } else {
        setMensaje(`⚠️ Error en el pago: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("⚠️ Error en la conexión con el servidor.");
    }
  };

  const renderEstado = (estado) => {
    return (
      <span className={estado === "Aprobado" ? "estado-aprobado" : "estado-rechazado"}>
        {estado}
      </span>
    );
  };

  return (
    <div className="compras-container">
      <h2>Marketplace - Compras</h2>
      <input type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} />
      <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
      <button onClick={handlePagar}>Pagar</button>
      {mensaje && <p>{mensaje}</p>}

      <h3>Historial de Compras</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Valor</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra, index) => (
            <tr key={index}>
              <td>{compra.producto}</td>
              <td>${compra.valor}</td>
              <td>{compra.fecha}</td>
              <td>{renderEstado(compra.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarPasarela && (
        <div className="modal">
          <div className="modal-content">
            <h2>Formulario de Pago</h2>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            <input type="text" placeholder="Número de tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />
            <input type="text" placeholder="Fecha Venc (MM/AA)" value={fechaVenc} onChange={(e) => setFechaVenc(e.target.value)} />
            <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} />
            <button type="submit" onClick={procesarPago}>Confirmar Pago</button>
            <button onClick={() => setMostrarPasarela(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compras;
