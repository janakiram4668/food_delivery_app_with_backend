const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant_controller');

// Add a new restaurant
router.post('/add', restaurantController.addRestaurant);

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get a restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Update a restaurant by ID
router.put('/:id', restaurantController.updateRestaurant);

// Delete a restaurant by ID
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
