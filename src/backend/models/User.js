const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google users
    role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
    googleId: { type: String }, // Google ID added
});

module.exports = mongoose.model('User', UserSchema);
