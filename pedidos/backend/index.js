const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB con Mongoose
mongoose.connect('mongodb+srv://edwin:wDs0hZnC8MtLzE3X@cluster0.20eim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Importar rutas
const ventaRoutes = require('./routes/ventaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

app.use('/api', ventaRoutes);
app.use('/api', clienteRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


