const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
    }

    res.json({ message: `Usuario ${name} con teléfono ${phone} registrado ✅` });
});

module.exports = router;
