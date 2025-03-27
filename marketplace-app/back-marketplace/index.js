const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://edwin:wDs0hZnC8MtLzE3X@cluster0.20eim.mongodb.net/marketplace-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Marketplace funcionando');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
