const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, phone } = req.body;
    res.json({ message: `Usuario ${name} con teléfono ${phone} registrado` });
});

module.exports = router;
