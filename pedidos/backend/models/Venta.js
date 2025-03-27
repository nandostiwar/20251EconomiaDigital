const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    producto: { type: String, required: true }
});

module.exports = mongoose.model('Venta', ventaSchema);
