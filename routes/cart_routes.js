const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addToCart);

// Get all cart items for a user
router.get('/:userId', cartController.getCartItems);

// Remove an item from the cart
router.delete('/remove/:cartItemId', cartController.removeFromCart);

// Clear the entire cart for a user
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
