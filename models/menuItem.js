const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
menuItemSchema.pre('remove', async function (next) {
  try {
    // Remove the menu item reference from the restaurant's menu array
    await Restaurant.findByIdAndUpdate(
      this.restaurant, // ID of the associated restaurant
      { $pull: { menu: this._id } } // Remove the reference
    );
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model('MenuItem', menuItemSchema);
