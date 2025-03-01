const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

// Check Authentication Status
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
