const fs = require('fs/promises');
const mongoose = require('mongoose');

/////////////////////////////////////////////LOGIN/////////////////////////////////////////////////////////////////////

const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
      const validateUser = await Usuarios.findOne({ correo, contrasena });

      if (validateUser) {
          console.log("Login exitoso para:", correo);
          // Supongamos que `validateUser` tiene un campo `role` y otros datos del usuario
          return res.json({
              success: true,
              message: 'Inicio de Sesion Exitoso!',
              user: {
                  correo: validateUser.correo,
                  nombre: validateUser.nombre,
                  rol: validateUser.rol, // Asegúrate de que el modelo de usuario tenga un campo `role`
              },
          });
      } else {
          return res.status(400).json({ success: false, message: 'El usuario o contraseña no son correctos' });
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};



///////////////////////////////////////////// Esquema usuario y admin /////////////////////////////////////////////////////////////////////



// Definir esquema y modelo para usuarios ====> IMPORTANTE
const usuariosSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    rol: String
});

const Usuarios = mongoose.model('Usuarios', usuariosSchema);


///////////////////////////////////////////// Crear usuario y admin /////////////////////////////////////////////////////////////////////

const createUser = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body; 

    const nuevoUsuario = new Usuarios({ 
      nombre, 
      correo, 
      contrasena, 
      rol
    });

    await nuevoUsuario.save();

    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};


///////////////////////////////////////////// Esquema de Ventas  /////////////////////////////////////////////////////////////////////

// Definir esquema y modelo para ventas ====> IMPORTANTE
const ventaSchema = new mongoose.Schema({
  producto: String,
  valor: String,
  nombre: String,
  cedula: String,
  telefono: String,
  tarjeta: String,
  fechaV: String,
  ccv: String,
  userId: String,
  estado: String,
  fechaReg: { type: Date, default: Date.now } // Establece la fecha automáticamente
});

const Venta = mongoose.model('Venta', ventaSchema);

///////////////////////////////////////////// Crear venta  /////////////////////////////////////////////////////////////////////

const createVenta = async (req, res) => {
  try {
    let { producto, valor, nombre, cedula, telefono, tarjeta, fechaV, ccv, userId } = req.body;

    // Validar estado de la tarjeta en el backend (doble seguridad)
    const tarjetaValida = '987654321';
    const estado = tarjeta === tarjetaValida ? 'Aceptada' : 'Denegada';

    const nuevaVenta = new Venta({ 
      producto, 
      valor, 
      nombre, 
      cedula, 
      telefono, 
      tarjeta, 
      fechaV, 
      ccv, 
      userId, 
      estado, 
      fechaReg: new Date()
    });

    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

///////////////////////////////////////////// Obtener las Ventas /////////////////////////////////////////////////////////////////////

const getVenta = async (req, res) => {
  try {
    const ventas = await Venta.find(); // Obtiene todas las ventas sin filtro
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ error: 'Error en el servidor al obtener las ventas' });
  }
};


///////////////////////////////////////////// Obtener Datos del Usuario /////////////////////////////////////////////////////////////////////

const getUsuario = async (req, res) => {
  try {
    const Usuarios = await Usuarios.find();
    res.json(Usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

module.exports = {
    loginUser,
    createUser,
    createVenta,
    getUsuario,
    getVenta,
}