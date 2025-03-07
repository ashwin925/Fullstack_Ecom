import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });
        
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.cookie("token", generateToken(user), { httpOnly: true });
        res.json({ message: "Login successful", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};
