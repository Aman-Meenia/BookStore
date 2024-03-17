import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// <------------------MIDDLEWARE ------------------------>
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// <--------------------EXPRESS ROUTES--------------------->
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

if (await connectMongoDB()) {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}
