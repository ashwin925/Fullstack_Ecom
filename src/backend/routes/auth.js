import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { authenticate } from "../middleware/authenticate.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";

dotenv.config();
const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

        res.json({ message: "Login successful", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get User Data (Protected)
router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Refresh Token
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = generateAccessToken(user);
        res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true });
        res.json({ accessToken: newAccessToken });
    });
});

// ✅ Logout
router.post("/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
});

export default router;
