const express = require("express");
const { verifyRole } = require("../controllers/authController");
const router = express.Router();

router.get("/admin", verifyRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/user", verifyRole(["user", "admin"]), (req, res) => {
    res.json({ message: "Welcome User" });
});

module.exports = router;