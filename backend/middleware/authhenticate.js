const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "Access denied. Please log in." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        req.user = user;
        next();
    });
};

module.exports = authenticate;
