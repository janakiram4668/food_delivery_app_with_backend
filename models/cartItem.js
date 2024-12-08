const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Optional if you have user-specific carts
  restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
});

module.exports = mongoose.model('cartItem', cartItemSchema);
