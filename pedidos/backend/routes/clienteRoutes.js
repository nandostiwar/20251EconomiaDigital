const express = require('express');
const router = express.Router();
const { crearCliente, obtenerClientes } = require('../controllers/clienteController');

router.post('/clientes', crearCliente);
router.get('/clientes', obtenerClientes);

module.exports = router;
