import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenUtils.js";

// Register
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

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error); // Log the actual error
    res.status(500).json({ message: "Server error" });
  }
};
// Add to authController.js
export const getMe = async (req, res) => {
  res.json(req.user); // User data from authenticate middleware
};