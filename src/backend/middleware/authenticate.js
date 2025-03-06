const jwt = require("jsonwebtoken");  // ✅ Change import to require
const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
};

const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
    }
    next();
};

module.exports = { authenticate, authorizeRoles };  // ✅ Use CommonJS export
