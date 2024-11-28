const express = require('express');
const {
  addMenuItem,
  getMenuItemsByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

// Route to add menu item to a restaurant
router.post('/:restaurantId/menu', addMenuItem);

// Route to get all menu items for a restaurant
router.get('/:restaurantId/menu', getMenuItemsByRestaurant);

// Route to update a menu item by its ID
router.put('/menu/:menuItemId', updateMenuItem);

// Route to delete a menu item by its ID
router.delete('/menu/:menuItemId', deleteMenuItem);

module.exports = router;
