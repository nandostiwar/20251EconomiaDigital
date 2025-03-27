const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Message', MessageSchema);

