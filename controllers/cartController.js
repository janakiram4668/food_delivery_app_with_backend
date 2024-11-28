const Cart = require('../models/cart'); // Replace with your cart model
const MenuItem = require('../models/menuItem'); // Ensure the MenuItem schema is imported

// Add a menu item to the cart
const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || !quantity) {
      return res.status(400).json({ message: 'Menu item ID and quantity are required' });
    }

    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Add menu item to cart
    const cartItem = {
      menuItem: menuItem._id,
      quantity,
      price: menuItem.price * quantity,
    };

    const cart = await Cart.findOne();
    if (!cart) {
      // If no cart exists, create a new one
      const newCart = new Cart({ items: [cartItem] });
      await newCart.save();
      return res.status(201).json(newCart);
    }

    // If cart exists, add or update the item
    const itemIndex = cart.items.findIndex((item) => item.menuItem.toString() === menuItemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = menuItem.price * cart.items[itemIndex].quantity;
    } else {
      cart.items.push(cartItem);
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove a menu item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { menuItemId } = req.params;

    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.menuItem.toString() === menuItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Menu item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update quantity of a cart item
const updateCartItemQuantity = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || !quantity) {
      return res.status(400).json({ message: 'Menu item ID and quantity are required' });
    }

    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.menuItem.toString() === menuItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Menu item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price =
      quantity * (await MenuItem.findById(menuItemId)).price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.menuItem');

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCartItems,
};
