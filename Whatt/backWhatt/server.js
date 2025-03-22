require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // 📌 Asegura que el JSON del body se pueda leer
app.use(cors());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes')); // ✅ Ahora sí existe

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://estebancastano01:EptGJL4SnkhDXN14@whattsdb.gsda1.mongodb.net/?retryWrites=true&w=majority&appName=whattsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('🔥 Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
