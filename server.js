require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Import Routes
const userRoutes = require('./routes/user_routes'); // Adjust the path to match your file structure
const restaurantRoutes = require('./routes/restaurant_routes'); // Restaurant routes
const menuRoutes = require('./routes/menu_routes');
const cartRoutes = require('./routes/cart_routes');

const cors = require('cors');




// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', userRoutes); // User-related routes
app.use('/api/restaurant', restaurantRoutes); // Restaurant-related routes
app.use('/api/restaurants', menuRoutes);
app.use('/api/cart', cartRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ message: 'Server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
