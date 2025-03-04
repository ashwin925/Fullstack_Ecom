const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middleware/authenticate');


// 🔹 Google OAuth Login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })  // ✅ Disable sessions
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        if (!req.user) {
            return res.redirect('/login'); // Redirect to login on failure
        }

        const token = jwt.sign(
            { id: req.user._id, email: req.user.email, role: req.user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
        });

        console.log("✅ Google Login Successful! Redirecting...");
        console.log("🔹 Token Set in Cookies: ", token);
        res.redirect("http://localhost:3000/dashboard"); 
    }
);


// 🔹 Get Logged-in User Info
router.get('/me', authenticate, (req, res) => {
    res.json(req.user);
});

// 🔹 Logout
router.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: "Logged out successfully" });
});

// 🔹 Role-based Routes
router.get('/admin/dashboard', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: "Welcome Admin! You have full access." });
});

router.get('/seller/products', authenticate, authorize(['seller', 'admin']), (req, res) => {
    res.json({ message: "Seller/Admin can manage products." });
});

router.get('/customer/orders', authenticate, authorize(['customer', 'seller', 'admin']), (req, res) => {
    res.json({ message: "Customers can view their orders." });
});

module.exports = router; // ✅ Only one module.exports
