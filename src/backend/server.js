const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/auth');
require('dotenv').config();
require('./config/passport');

const app = express();

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true // Allow cookies & authentication headers
}));

// Middleware
app.use(express.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));
