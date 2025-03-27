const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB con Mongoose
mongoose.connect('mongodb+srv://edwin:wDs0hZnC8MtLzE3X@cluster0.20eim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Importar rutas
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);


// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


