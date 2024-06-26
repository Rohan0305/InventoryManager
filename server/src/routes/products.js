import express from "express";

import { UserModel } from "../models/Users.js"
import { ProductModel } from "../models/Products.js";
import { verifyToken } from "./users.js";


const router = express.Router();

router.get("/get-products", async (req, res) => {
    try {
      const userId = req.query.userId; 
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const products = await ProductModel.find({
        _id: { $in: user.products },
      });
  
      res.status(200).json({ products }); 
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/get-products/price-range', async (req, res) => {
    const { userId, minPrice, maxPrice } = req.query;
  
    try {
      const products = await ProductModel.find({
        owner: userId,
        price: { $gte: minPrice, $lte: maxPrice }
      });
  
      res.status(200).json({ products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  router.get("/get-product/:productId", async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product); 
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put("/update-product/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/delete-product/:productId", async (req, res) => {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.put("/remove-product/:productId", async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.products = user.products.filter(product => product.toString() !== req.params.productId);
      await user.save();
      res.status(200).json({ message: "Product removed from user" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/create-product", verifyToken, async (req, res) => {
    const product = await new ProductModel(req.body);
    try {
        await product.save();
        res.json(product);
    } catch (err) {
        res.json(err);
    }
 
  });

router.put("/", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        const product = await ProductModel.findById(req.body.productId);
        user.products.push(product);
        user.save();
        res.json(user);
    } catch (err) {
        res.json(err);
    }
 
});





export { router as productsRouter };