import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.routes.js";
import AdminRoutes from "./routes/admin/admin.routes.js";
import productRoutes from "./routes/public/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'elegant-ecommerce-7fyo.vercel.app'
    : 'http://localhost:5173',
  credentials: true  //without them cookies won't be sent
}));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
