const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    async (req, res) => {
        const user = req.user;

        // ✅ Generate Tokens
        const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

        // ✅ Store Tokens in Secure Cookies
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "Strict" });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict" });

        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

// ✅ Refresh Token Route (Moved Above Export)
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: "Refresh token missing" });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "15m" });
        res.json({ accessToken: newAccessToken });
    });
});

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
    res.clearCookie("refreshToken");  // ✅ Clear refresh token on logout
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
