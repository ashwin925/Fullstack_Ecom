const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);  // Redirect to React frontend
    }
);


// Logout Route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
