import express from "express";
// CORRECTED IMPORT PATH (changed 'authenticate.js' → 'auth.js')
import { protect, authorize } from "../middleware/auth.js";
import User from "../models/User.js";
const router = express.Router();

// ✅ Corrected routes below
router.get("/users", 
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put("/make-admin/:id", 
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // ✅ Prevent unnecessary updates
      if (user.role === "admin") {
        return res.status(400).json({ message: "User is already admin" });
      }

      user.role = "admin";
      await user.save();
      res.status(200).json({ message: "User promoted to admin" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put("/make-seller/:id", 
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // ✅ Check existing role
      if (user.role === "seller") {
        return res.status(400).json({ message: "User is already seller" });
      }

      user.role = "seller";
      await user.save();
      res.status(200).json({ message: "User promoted to seller" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;