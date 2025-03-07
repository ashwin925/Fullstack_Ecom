const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authenticate");


router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
  });
  
  router.get("/user", authenticate, authorize(["user", "admin"]), (req, res) => {
    res.json({ message: "Welcome User" });
  });
  
  module.exports = router;