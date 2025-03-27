const User = require('../models/User');

module.exports = {
    newUser: async (req, res) => {
        try {
            // Verificar si el correo ya existe
            const existingUser = await User.findOne({ correo: req.body.correo });
            if (existingUser) {
                return res.status(400).json({
                    error: 'Correo ya registrado. Por favor, utiliza otro correo.'
                });
            }

            const user = new User({ ...req.body, rol: 'usuario' });
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    newAdmin: async (req, res) => {
        try {
            // Verificar si el correo ya existe
            const existingUser = await User.findOne({ correo: req.body.correo });
            if (existingUser) {
                return res.status(400).json({
                    error: 'Correo ya registrado. Por favor, utiliza otro correo.'
                });
            }

            const user = new User({ ...req.body, rol: 'admin' });
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    login: async (req, res) => {
        const { correo, contrasena } = req.body;
        try {
            const user = await User.findOne({ correo });

            if (!user) {
                return res.status(401).json({
                    error: 'Cuenta no registrada. Por favor, crea una cuenta.'
                });
            }

            if (user.contrasena !== contrasena) {
                return res.status(401).json({
                    error: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.'
                });
            }

            res.send(user);
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};