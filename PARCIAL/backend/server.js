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
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ["Admin", "User"] } // Agregamos el rol

});

const User = mongoose.model('User', UserSchema);

// Modelo de Venta
const SaleSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  estado: { type: String, required: true, enum: ["Aprobado", "Rechazado"] },
  fecha: { type: Date, default: Date.now },
  nombre: { type: String, required: true },
  producto: { type: String, required: true },
  telefono: { type: String, required: true },
  valor: { type: Number, required: true }
});

const Sale = mongoose.model('Sale', SaleSchema);



// Registrar Usuario
app.post('/users', async (req, res) => {
  try {
    const { email, password, rol } = req.body;
    if (!email || !password || !rol) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = new User({ email, password, rol });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});


// Iniciar Sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    res.json({ message: 'Inicio de sesión exitoso', userId: user._id, rol: user.rol });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
});

// Registrar Venta
app.post('/sales', async (req, res) => {
  try {
    const { cedula, estado, nombre, producto, telefono, valor } = req.body;
    if (!cedula || !estado || !nombre || !producto || !telefono || !valor) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const nuevaVenta = new Sale({ cedula, estado, nombre, producto, telefono, valor });
    await nuevaVenta.save();
    res.status(201).json({ message: 'Venta registrada con éxito', venta: nuevaVenta });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la venta', error });
  }
});

// Obtener todas las ventas
app.get('/sales', async (req, res) => {
  try {
    const ventas = await Sale.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));