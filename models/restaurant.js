const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  area: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
  ], // Ensure this is an array
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
