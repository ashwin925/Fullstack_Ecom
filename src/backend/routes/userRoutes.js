const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authenticate");
const User = require("../models/User");

// 🔐 Get All Users (Admin Only)
router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 Make a User an Admin (Admin Only)
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

// 🔐 Make a User a Seller (Admin Only)
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

module.exports = router;
