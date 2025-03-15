const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://allrg1104:vL4leF1sPmgI5w2Z@cluster0.xtqyw.mongodb.net/BD_Pedidos?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir esquema y modelo para ventas ====> IMPORTANTE
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


// Definir esquema y modelo para usuarios ====> IMPORTANTE
const usuariosSchema = new mongoose.Schema({
    nombre: String,
    cedula: String,
    correo: String,
    direccion: String,
    telefono: String
});

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

// Ruta para crear un usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, cedula, correo, direccion, telefono } = req.body;
    const nuevoUsuarios = new Usuarios({ nombre, cedula, correo, direccion, telefono });
    await nuevoUsuarios.save();
    res.status(201).json(nuevoUsuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
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
