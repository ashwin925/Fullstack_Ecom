const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ✅ Generate JWT with role-based authentication
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful", role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Middleware to verify JWT and roles
exports.verifyRole = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.status(403).json({ message: "Unauthorized" });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Invalid token" });

            if (!roles.includes(decoded.role)) return res.status(403).json({ message: "Access denied" });
            req.user = decoded;
            next();
        });
    };
};
