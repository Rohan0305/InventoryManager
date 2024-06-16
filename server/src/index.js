import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js"; 
import {productsRouter} from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

const MONGODB_URI = "mongodb+srv://rohanvallapalli:Mernpassword123@inventorydb.ye3k4zo.mongodb.net/inventorydb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3001, () => console.log("SERVER STARTED"));

