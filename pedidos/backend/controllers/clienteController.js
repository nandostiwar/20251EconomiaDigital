const Cliente = require('../models/Cliente');

exports.crearCliente = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo } = req.body;
        if (!nombre || !direccion || !telefono || !correo) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

        const nuevoCliente = new Cliente({ nombre, direccion, telefono, correo });
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};
