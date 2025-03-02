const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // ✅ Import cookie parser
const authRoutes = require('./routes/auth');
require('dotenv').config();
require('./config/passport');

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());  // ✅ Allows access to cookies

// ✅ Enable CORS for frontend
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,  // ✅ Allow credentials (cookies, headers)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

// ✅ Remove express-session (Only use JWT)
app.use(passport.initialize());

// ✅ Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));
