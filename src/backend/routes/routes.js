import express from "express";
import { authenticate, authorize } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/user", authenticate, authorize(["user", "admin"]), (req, res) => {
    res.json({ message: "Welcome User" });
});

export default router; // ES module export