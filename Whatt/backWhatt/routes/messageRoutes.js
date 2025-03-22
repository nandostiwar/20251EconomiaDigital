const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Ruta para obtener todos los mensajes (GET)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
});

// Ruta para crear un nuevo mensaje (POST)
router.post('/', async (req, res) => {
    console.log('📥 Datos recibidos:', req.body); // ✅ Para depuración

    const { origin, destination, message } = req.body;

    if (!origin || !destination || !message) {
        return res.status(400).json({ error: 'Todos los campos (origin, destination, message) son obligatorios' });
    }

    try {
        const newMessage = new Message({ origin, destination, message });
        await newMessage.save();
        res.status(201).json({ message: 'Mensaje guardado correctamente ✅', newMessage });
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar el mensaje' });
    }
});

module.exports = router;
