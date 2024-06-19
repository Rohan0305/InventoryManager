import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  vendor_name: { type: String, required: true }, 
  price: { type: Number, required: true },       
  items: { type: Number, required: true },       
  date: { type: Date, required: true, default: Date.now }, 
  ppu: { type: Number, required: true }, 
  productId: {type: mongoose.Schema.ObjectId, ref: "products"},
});

export const OrderModel = mongoose.model("orders", OrderSchema);