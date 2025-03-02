const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    async (req, res) => {
        const user = req.user;
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("accessToken", token, { httpOnly: true, secure: true, sameSite: "Strict" });
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

// Check Auth Status
router.get("/me", (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        const user = await User.findById(decoded.id);
        res.json(user);
    });
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
