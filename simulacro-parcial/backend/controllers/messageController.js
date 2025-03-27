const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
    try {
        const { origin, destination, message } = req.body;
        const sender = await User.findOne({ phone: origin });
        const receiver = await User.findOne({ phone: destination });
        if (!sender) return res.status(400).json({ message: 'El remitente no existe' });
        if (!receiver) return res.status(400).json({ message: 'El destinatario no existe' });

        const newMessage = new Message({ origin, destination, message });
        await newMessage.save();
        res.status(201).json({ message: 'Mensaje enviado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mensajes', error });
    }
};

