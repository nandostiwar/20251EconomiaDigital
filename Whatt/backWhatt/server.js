require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // 🔹 La inicialización de `app` debe estar antes de usar `app.use()`
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', require('./routes/userRoutes')); // ✅ Debe estar después de inicializar `app`

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Conexión a MongoDB (agrega opciones para evitar advertencias)
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://estebancastano01:EptGJL4SnkhDXN14@whattsdb.gsda1.mongodb.net/?retryWrites=true&w=majority&appName=whattsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('🔥 Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
