import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch("http://localhost:5000/sales");
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error("Error al obtener ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  const renderEstado = (estado) => {
    return (
      <span className={estado === "Aprobado" ? "estado-aprobado" : "estado-rechazado"}>
        {estado}
      </span>
    );
  };

  return (
    <div className="compras-container">
      <h2>Panel de Administrador</h2>
      <h3>Todas las Ventas</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Valor</th>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta._id}>
              <td>{venta.producto}</td>
              <td>${venta.valor}</td>
              <td>{venta.nombre}</td>
              <td>{venta.cedula}</td>
              <td>{venta.telefono}</td>
              <td>{new Date(venta.fecha).toLocaleString()}</td>
              <td>{renderEstado(venta.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
