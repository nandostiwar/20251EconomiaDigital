const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/drivers');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: '*', // Permitir todas las solicitudes (ajustar según necesidad)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

app.use('/v1/drivers', router);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
