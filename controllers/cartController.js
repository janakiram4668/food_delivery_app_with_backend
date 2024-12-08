const cartItem = require('../models/cartItem');
const Restaurant = require('../models/Restaurant');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { itemId, name, price, quantity, userId, restaurantId } = req.body;

    if (!itemId || !name || !price || !quantity || !userId || !restaurantId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const cartItems = new cartItem({ itemId, name, price, quantity, userId, restaurantId });
    await cartItems.save();
    res.status(201).json({ message: "Item added to cart successfully", cartItems });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL
    const cartItems = await cartItem.find({ userId }) // Find items for the specific user
      .populate('restaurantId', 'name') // Populate restaurant name
      .exec();

    if (!cartItems) {
      return res.status(404).json({ error: 'No items found in the cart' });
    }

    res.status(200).json(cartItems); // Send cart items as response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    await cartItem.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

// Clear the entire cart for a user
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await cartItem.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
