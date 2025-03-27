const express = require('express');
const controller = require('../controllers/saleController');
const router = express.Router();

router.post('/nuevaVenta', controller.nuevaVenta);
router.get('/actualizarUser/:id', controller.actualizarUser);
router.put('/actualizarAdmin/:id', controller.actualizarAdmin);
router.get('/', controller.obtenerTodasVentas); // Nueva ruta para obtener todas las ventas

module.exports = router;