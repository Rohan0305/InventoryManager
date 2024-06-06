import express from "express";

import { UserModel } from "../models/Users.js"
import { ProductModel } from "../models/Products.js";


const router = express.Router();

router.get("/get-products", async (req, res) => {
    try {
      const user = await UserModel.findById(req.body.userId);
      const products = await ProductModel.find({
        _id: { $in: user.products },
      });
  
      res.status(201).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post("/create-product", async (req, res) => {
    const product = await new ProductModel(req.body);
    console.log(product);
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