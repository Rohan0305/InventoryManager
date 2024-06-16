import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    price: { type: Number, required: true},
    imageURL: { type: String, required: true},
    owner: {type: mongoose.Schema.ObjectId, ref: "users", required: true},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "orders"}],
});

export const ProductModel = mongoose.model("products", ProductSchema);