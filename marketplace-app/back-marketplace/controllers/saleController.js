const Sale = require('../models/Sale');
const User = require('../models/User');

module.exports = {
    nuevaVenta: async (req, res) => {
        try {
            const { tarjeta, fechaVencimiento, cvv } = req.body;

            const tarjetaValida = (
                tarjeta.replace(/\s/g, '') === '9858658998562541' &&
                fechaVencimiento === '12/29' &&
                cvv === '596'
            );

            const sale = new Sale({
                ...req.body,
                estado: tarjetaValida ? 'Aceptado' : 'Declinado'
            });

            await sale.save();
            res.status(201).send(sale);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    actualizarUser: async (req, res) => {
        try {
            const sales = await Sale.find({ usuarioId: req.params.id }).sort({ fechaCompra: -1 });
            res.send(sales);
        } catch (error) {
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
                const user = await User.findById(sale.usuarioId).select('nombre correo').lean();
                return {
                    ...sale,
                    nombreUsuario: user?.nombre || 'Usuario no encontrado',
                    correoUsuario: user?.correo || ''
                };
            }));

            res.send(salesConUsuario);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};