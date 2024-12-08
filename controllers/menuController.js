const MenuItem = require('../models/menuItem');
const Restaurant = require('../models/Restaurant');

// Add menu item to a restaurant
exports.addMenuItem = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, price } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menuItem = new MenuItem({ restaurant: restaurantId, name, price });
    await menuItem.save();

    // Add menuItem reference to the restaurant's menu array
    restaurant.menu.push(menuItem._id);
    await restaurant.save();

    res.status(201).json({ message: 'Menu item added successfully', menuItem });
  } catch (error) {
    console.error('Error adding menu item:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all menu items for a restaurant
exports.getMenuItemsByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    if (!menuItems.length) {
      return res.status(404).json({ message: 'No menu items found for this restaurant' });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update menu item by ID
exports.updateMenuItem = async (req, res) => {
  const { menuItemId } = req.params;
  const { name, price } = req.body;

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated successfully', menuItem });
  } catch (error) {
    console.error('Error updating menu item:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete menu item by ID
exports.deleteMenuItem = async (req, res) => {
    const { menuItemId } = req.params;
  
    try {
      // Find the menu item to get its associated restaurant
      const menuItem = await MenuItem.findById(menuItemId);
  
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Remove the menu item from the database
      await MenuItem.findByIdAndDelete(menuItemId);
  
      // Remove the menu item reference from the restaurant's menu array
      await Restaurant.findByIdAndUpdate(
        menuItem.restaurant, // ID of the associated restaurant
        { $pull: { menu: menuItemId } }, // Remove the reference
        { new: true } // Return the updated document
      );
  
      res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error('Error deleting menu item:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };