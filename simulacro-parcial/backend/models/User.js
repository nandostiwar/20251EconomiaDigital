const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    phone: { type: String, unique: true, required: true },
    name: { type: String, required: true }
});
module.exports = mongoose.model('User', UserSchema);
