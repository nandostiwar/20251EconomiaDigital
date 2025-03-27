const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { phone, name } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'Teléfono ya registrado' });
    const newUser = new User({ phone, name });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
};
