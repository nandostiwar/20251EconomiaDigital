const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://sajoesor:Qp76W4Fhuh9DIFbh@cluster0.fenw8.mongodb.net/WHATSAPP?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en la conexión a MongoDB:', err);
});

// Definir esquema y modelo para Usuarios
const usersSchema = new mongoose.Schema({
  nombre: String,
  telefono: String
});

const User = mongoose.model('User', usersSchema);

// Ruta para registrar un usuario
app.post('/users', async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const nuevoUser = new User({ nombre, telefono });
    await nuevoUser.save();
    res.status(201).json(nuevoUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Definir esquema y modelo para Mensajes
const mensajesSchema = new mongoose.Schema({
  origen: String,
  destino: String,
  mensaje: String
});

const Mensaje = mongoose.model('Mensaje', mensajesSchema);

// Ruta para enviar un mensaje
app.post('/mensajes', async (req, res) => {
  try {
    const { origen, destino, mensaje } = req.body;
    const nuevoMensaje = new Mensaje({ origen, destino, mensaje });
    await nuevoMensaje.save();
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Ruta para obtener todos los mensajes
app.get('/mensajes', async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.status(200).json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
