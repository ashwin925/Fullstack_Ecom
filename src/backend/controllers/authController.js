import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User exists" });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ token: generateToken(user), role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ token: generateToken(user), role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getMe = async (req, res) => {
    res.json(req.user);
};