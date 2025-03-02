require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const MongoStore = require('connect-mongo'); // Persistent session storage
const authRoutes = require('./routes/auth');
require('./config/passport');

const app = express();

// ✅ Enable CORS for frontend communication
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Stores sessions in MongoDB
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set true in production (HTTPS)
        sameSite: 'lax'
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Database Connection & Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
    .catch(err => console.log(err));
