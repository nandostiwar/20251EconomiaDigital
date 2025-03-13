const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://OscarJM:bOJkIUGJEzqgS3eq@ganaloco.a1u9b.mongodb.net/BD_Pedido?retryWrites=true&w=majority&appName=GanaLoco', {
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


// Definir esquema y modelo
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  direccion: String,
  cedula: String,

});

const usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta para crear una venta
app.post('/usuario', async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, cedula } = req.body;
    const nuevoUsuario = new usuario({ nombre, correo, telefono, direccion, cedula });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la usuario' });
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
