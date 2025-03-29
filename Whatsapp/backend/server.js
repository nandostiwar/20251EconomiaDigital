const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://sajoesor:Qp76W4Fhuh9DIFbh@cluster0.fenw8.mongodb.net/PARCIAL?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en la conexión a MongoDB:', err);
});

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Registrar Usuario
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Iniciar Sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
