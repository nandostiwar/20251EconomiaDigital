const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/drivers');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/v1/drivers', router); // Ahora router está definido correctamente


const corsOptions = {
  origin: '*', // Permitir todas las solicitudes (cambiar según necesidad)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));  // Aplica tus opciones de CORS correctamente




// Conexión a MongoDB
mongoose.connect('mongodb+srv://allrg1104:vL4leF1sPmgI5w2Z@cluster0.xtqyw.mongodb.net/BD_Marketplace?retryWrites=true&w=majority&appName=Cluster0')
  //useNewUrlParser: true,
  //useUnifiedTopology: true
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err))
;

app.use(express.json());

app.use('/v1/drivers', router);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
