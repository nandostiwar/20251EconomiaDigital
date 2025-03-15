const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://Niquito:eB6Myndt5Y638AAW@cluster0.njkfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Esquema y modelo de ventas
const ventaSchema = new mongoose.Schema({
  nombre: String,
  producto: String
});
const Venta = mongoose.model('Venta', ventaSchema);

// Esquema y modelo de clientes
const clienteSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  correo: String
});
const Cliente = mongoose.model('Cliente', clienteSchema);

// Ruta para crear una venta y guardar los datos del cliente
app.post('/ventas', async (req, res) => {
  try {
    const { nombre, direccion, telefono, correo, producto } = req.body;

    // Guardar en la colección de ventas
    const nuevaVenta = new Venta({ nombre, producto });
    await nuevaVenta.save();

    // Guardar en la colección de clientes
    const nuevoCliente = new Cliente({ nombre, direccion, telefono, correo });
    await nuevoCliente.save();

    res.status(201).json({ venta: nuevaVenta, cliente: nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta y guardar el cliente' });
  }
});

// Ruta para obtener todas las ventas
app.get('/ventas', async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
});

// Ruta para obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
