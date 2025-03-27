const Venta = require('../models/Venta');

exports.crearVenta = async (req, res) => {
    try {
        const { nombre, producto } = req.body;
        if (!nombre || !producto) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

        const nuevaVenta = new Venta({ nombre, producto });
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};
