import express from "express";

import { ProductModel } from "../models/Products.js";
import { OrderModel } from "../models/Orders.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
    const order = await new OrderModel(req.body);
    try {
        await order.save();
        res.json(order);
    } catch (err) {
        res.json(err);
    }
 
  });

router.put("/", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.body.productId);
        const order = await OrderModel.findById(req.body.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }
        product.orders.push(order);
        product.save();
        res.json(product);
    } catch (err) {
        res.json(err);
    }
 
});

router.get("/get-orders/:productId", async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const orders = await OrderModel.find({
        _id: { $in: product.orders},
      })

      res.status(200).json({ orders }); 
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }); 

  router.get("/get-order/:orderId", async (req, res) => {
    try {
      const order = await OrderModel.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ order }); 
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }); 

  router.put('/update-order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const updatedOrderData = req.body;
  
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).send({ message: 'Order not found' });
      }
  
      res.status(200).send(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to update order', error: error.message });
    }
  });


export { router as ordersRouter };