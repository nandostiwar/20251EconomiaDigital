const express = require('express');
const router = express.Router();
const { crearVenta, obtenerVentas } = require('../controllers/ventaController');

router.post('/ventas', crearVenta);
router.get('/ventas', obtenerVentas);

module.exports = router;
