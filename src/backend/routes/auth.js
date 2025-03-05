const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middleware/authenticate');

// Google OAuth Login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        const token = jwt.sign(
            { id: req.user._id, email: req.user.email, role: req.user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === "production"
            sameSite: "none",
        });

        console.log("✅ Google Login Successful! Redirecting...");
        res.redirect("http://localhost:3000/dashboard");
    }
);

// Get Logged-in User Info
router.get('/me', authenticate, (req, res) => {
    res.json(req.user);
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: "Logged out successfully" });
});

// Role-based Routes
router.get('/admin/dashboard', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: "Welcome Admin! You have full access." });
});

router.get('/seller/products', authenticate, authorize(['seller', 'admin']), (req, res) => {
    res.json({ message: "Seller/Admin can manage products." });
});

router.get('/customer/orders', authenticate, authorize(['customer', 'seller', 'admin']), (req, res) => {
    res.json({ message: "Customers can view their orders." });
});

module.exports = router;
