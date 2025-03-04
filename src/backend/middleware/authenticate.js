const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const JWT_SECRET = process.env.JWT_SECRET;

// 🔹 Authenticate Middleware
const authenticate = async (req, res, next) => {
    console.log("Received cookies:", req.cookies); // Debug: Log received cookies

    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; // Support both cookies & headers
    if (!token) return res.status(401).json({ message: "Access denied. Please log in." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id); // Fetch user from DB

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user; // Attach full user data
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

// 🔹 Authorize Middleware
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have access." });
        }
        next();
    };
};

module.exports = { authenticate, authorize }; // ✅ Export both functions
