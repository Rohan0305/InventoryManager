import express from "express";

import { ProductModel } from "../models/Products.js";


const router = express.Router();

router.post("/create-product", async (req, res) => {
    const product = await new ProductModel(req.body);
    
    try {
        await product.save();
        res.json(product);
    } catch (err) {
        res.json(err);
    }
 
  });



export { router as productsRouter };