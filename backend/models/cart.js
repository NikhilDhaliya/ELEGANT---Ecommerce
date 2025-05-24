// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
    },
  ],
  // total: { type: Number, default: 0 }, // Optional
}, { timestamps: true });


export default mongoose.model('Cart', cartSchema);