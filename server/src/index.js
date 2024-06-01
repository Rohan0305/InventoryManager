import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js"; 
import {productsRouter} from "./routes/products.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productsRouter);

const MONGODB_URI = "mongodb+srv://rohanvallapalli:Mernpassword123@inventorydb.ye3k4zo.mongodb.net/inventorydb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3001, () => console.log("SERVER STARTED"));

