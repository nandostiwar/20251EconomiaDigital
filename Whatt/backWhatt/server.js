require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Conectar a MongoDB (si usas una base de datos)
mongoose.connect('mongodb+srv://estebancastano01:nNk69p9ZXBfQ4MXD@whattsdb.gsda1.mongodb.net/?retryWrites=true&w=majority&appName=whattsdb', {
  
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
