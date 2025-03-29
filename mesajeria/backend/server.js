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
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Definir esquema y modelo para usuarios
const registroSchema = new mongoose.Schema({
  telefono: String,
  nombre: String
});

const Registro = mongoose.model('Registro', registroSchema);

// Ruta para agregar un usuario
app.post('/usuarios', async (req, res) => {
  try {
    console.log("📩 Recibiendo usuario:", req.body);
    const { telefono, nombre } = req.body;

    if (!telefono || !nombre) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoRegistro = new Registro({ telefono, nombre });
    await nuevoRegistro.save();
    console.log("✅ Usuario guardado:", nuevoRegistro);

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Ruta para obtener todos los usuarios registrados
app.get('/usuarios', async (req, res) => {
  try {
    console.log("📩 Obteniendo registros...");
    const registros = await Registro.find();
    console.log("✅ Registros encontrados:", registros);
    res.json(registros);
  } catch (error) {
    console.error("❌ Error al obtener los registros:", error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

// Definir esquema y modelo para mensajes
const mensajeSchema = new mongoose.Schema({
  origen: String,
  destino: String,
  mensaje: String
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

// Ruta para agregar un mensaje (pedido)
app.post('/mensajes', async (req, res) => {
  try {
    console.log("📩 Recibiendo mensaje:", req.body);
    const { origen, destino, mensaje } = req.body;

    if (!origen || !destino || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoMensaje = new Mensaje({ origen, destino, mensaje });
    await nuevoMensaje.save();
    console.log("✅ Mensaje guardado:", nuevoMensaje);

    res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.error("❌ Error al crear mensaje:", error);
    res.status(500).json({ error: 'Error al crear mensaje' });
  }
});

// Ruta para obtener todos los mensajes
app.get('/mensajes', async (req, res) => {
  try {
    console.log("📩 Obteniendo mensajes...");
    const mensajes = await Mensaje.find();
    console.log("✅ Mensajes encontrados:", mensajes);
    res.json(mensajes);
  } catch (error) {
    console.error("❌ Error al obtener mensajes:", error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
