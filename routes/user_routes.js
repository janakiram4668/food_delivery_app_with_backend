const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register); // Use the destructured `register` function
router.post('/login', login);       // Use the destructured `login` function

// Protected routes
router.get('/profile', authenticate, getProfile); // Protected route with authentication

module.exports = router;
