const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://ivanrodriguez01:MEEYD3MH7y8Nhfuu@cluster0.f2uyi.mongodb.net/Bd_pedidos?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir esquema y modelo
const ventaSchema = new mongoose.Schema({
  nombre: String,
  producto: String
});

const Venta = mongoose.model('Venta', ventaSchema);

// Ruta para crear una venta
app.post('/ventas', async (req, res) => {
  try {
    const { nombre, producto } = req.body;
    const nuevaVenta = new Venta({ nombre, producto });
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
});
//esquema para la tabla de usuarios 

// Definir esquema y modelo
const datosSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  correo: String,
  direccion: String,
  telefono: String,
});

const datos = mongoose.model('Datos', datosSchema);

// Ruta para crear una venta
app.post('/datos', async (req, res) => {
  try {
    const { nombre, cedula, correo, direccion, telefono } = req.body;
    const nuevoDatos = new datos({ nombre, cedula, correo, direccion,telefono });
    await nuevoDatos.save();
    res.status(201).json(nuevoDatos);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo dato' });
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

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
