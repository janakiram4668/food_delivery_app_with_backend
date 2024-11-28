const express = require('express');
const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCartItems,
} = require('../controllers/cartController');

const router = express.Router();

// Add menu item to cart
router.post('/add', addToCart);

// Remove menu item from cart
router.delete('/remove/:menuItemId', removeFromCart);

// Update item quantity in the cart
router.put('/update', updateCartItemQuantity);

// Get all cart items
router.get('/', getCartItems);

module.exports = router;
