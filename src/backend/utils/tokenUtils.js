const jwt = require("jsonwebtoken");  // ✅ Change import to require
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = { generateAccessToken, generateRefreshToken }; // ✅ Use CommonJS export
