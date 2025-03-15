const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://allrg1104:vL4leF1sPmgI5w2Z@cluster0.xtqyw.mongodb.net/BD_Whatsapp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir esquema y modelo para ventas ====> IMPORTANTE
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  celular: String
});

const Registro = mongoose.model('Registro', usuarioSchema);

// Ruta para crear una venta
app.post('/registro', async (req, res) => {
  try {
    const { nombre, celular } = req.body;

    // Verificar si el número ya existe en la base de datos
    const usuarioExistente = await Registro.findOne({ celular });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El número de celular ya está registrado' });
    }

    // Si no existe, proceder con el registro
    const nuevoRegistro = new Registro({ nombre, celular });
    await nuevoRegistro.save();
    
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro' });
  }
});



// Definir esquema y modelo para usuarios ====> IMPORTANTE
const mensajesSchema = new mongoose.Schema({
    origen: String,
    destino: String,
    mensaje: String
});

const Mensajes = mongoose.model('Mensajes', mensajesSchema);

// Ruta para crear un usuario
app.post('/mensajes', async (req, res) => {
  try {
    const { origen, destino, mensaje} = req.body;
    const nuevoMensaje = new Mensajes({ origen, destino, mensaje});
    await nuevoMensaje.save();
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Mensaje' });
  }
});

// Ruta para obtener todas las ventas
app.get('/Mensajes', async (req, res) => {
  try {
    const mensajes = await Mensajes.find();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las Mensajes' });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
