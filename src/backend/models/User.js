const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
    googleId: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
