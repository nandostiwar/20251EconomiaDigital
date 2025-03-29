const Sale = require('../models/Sale');
const User = require('../models/User');

module.exports = {
    nuevaVenta: async (req, res) => {
        try {
            console.log("Datos recibidos en nuevaVenta:", req.body); // Verificar datos
    
            const { tarjeta, fechaVencimiento, cvv, nombreProducto, valorProducto, ...resto } = req.body;
    
            // Mapeo de nombres correctos
            const producto = nombreProducto; // Renombramos
            const valor = Number(valorProducto); // Aseguramos que sea número
    
            if (!producto || !valor) {
                console.error("Error: Faltan datos ->", { producto, valor });
                return res.status(400).send({ error: "Faltan datos: producto y/o valor" });
            }
    
            const tarjetaValida = (
                tarjeta.replace(/\s/g, '') === '9858658998562541' &&
                fechaVencimiento === '12/29' &&
                cvv === '596'
            );
    
            const sale = new Sale({
                ...resto, // Agregar el resto de los datos
                tarjeta,
                fechaVencimiento,
                cvv,
                producto,  // Ahora sí está correctamente mapeado
                valor,     // Ahora sí está correctamente mapeado
                estado: tarjetaValida ? 'Completado' : 'Rechazado'
            });
    
            await sale.save();
            console.log("Venta guardada exitosamente:", sale);
            res.status(201).send(sale);
        } catch (error) {
            console.error("Error al guardar venta:", error);
            res.status(500).send(error);
        }
    },  
    
    

    actualizarUser: async (req, res) => {
        try {
            const sales = await Sale.find({ usuarioId: req.params.id }).sort({ fechaCompra: -1 });
          console.log("Ventas encontradas en el backend:", sales); // <-- Agrega esto
          res.send(sales);
        } catch (error) {
          console.error("Error en actualización:", error);
          res.status(400).send(error);
        }
      },
      
    actualizarAdmin: async (req, res) => {
        try {
            const sale = await Sale.findByIdAndUpdate(
                req.params.id,
                { estado: req.body.estado },
                { new: true }
            );
            res.send(sale);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    obtenerTodasVentas: async (req, res) => {
        try {
            const sales = await Sale.find().sort({ fechaCompra: -1 }).lean();

            // Poblar información del usuario para cada venta
            const salesConUsuario = await Promise.all(sales.map(async sale => {
                const user = await User.findById(sale.usuarioId).select('nombre correo valor').lean();
                return {
                    ...sale,
                    nombreUsuario: user?.nombre || 'Usuario no encontrado',
                    correoUsuario: user?.correo || '',
                    valorProducto: user?.valor || ''

                };
            }));

            res.send(salesConUsuario);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};