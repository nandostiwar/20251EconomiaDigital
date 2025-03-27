const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    valor: Number,
    producto: String,
    nombre: String,
    cedula: String,
    telefono: String,
    tarjeta: String,
    fechaVencimiento: String,
    cvv: String,
    fechaCompra: { type: Date, default: Date.now },
    estado: { type: String, enum: ['Aceptado', 'Declinado'] },
    usuarioId: String
});

module.exports = mongoose.model('Sale', SaleSchema);