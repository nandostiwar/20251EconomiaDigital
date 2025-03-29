const express = require('express');
const router = express.Router();
const masterController = require('./controllers/masterController.js');


router
    .post('/login', masterController.loginUser)
    .post('/usuarios', masterController.createUser)
    .post('/ventas', masterController.createVenta)
    .get('/usuarios', masterController.getUsuario)
    .get('/venta', masterController.getVenta);
    
    module.exports = router;