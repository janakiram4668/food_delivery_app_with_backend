const Restaurant = require('../models/restaurant');

// Add a new restaurant
exports.addRestaurant = async (req, res) => {
  const { name, area, imageUrl } = req.body;

  try {
    const restaurant = new Restaurant({ name, area, imageUrl });
    await restaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
  } catch (error) {
    console.error('Error adding restaurant:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  

exports.getRestaurantById = async (req, res) => {
try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
} catch (error) {
    console.error('Error fetching restaurant:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
}
};
 

exports.updateRestaurant = async (req, res) => {
const { name, area, imageUrl } = req.body;

try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    { name, area, imageUrl },
    { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant updated successfully', updatedRestaurant });
} catch (error) {
    console.error('Error updating restaurant:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
}
};


exports.deleteRestaurant = async (req, res) => {
try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant deleted successfully' });
} catch (error) {
    console.error('Error deleting restaurant:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
}
};

  