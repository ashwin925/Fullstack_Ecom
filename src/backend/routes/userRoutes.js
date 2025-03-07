import express from "express";
import { authenticate, authorize } from "../middleware/authenticate.js";
import User from "../models/User.js";
const router = express.Router();

router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/make-admin/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "User promoted to admin" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/make-seller/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "seller";
    await user.save();
    res.status(200).json({ message: "User promoted to seller" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
