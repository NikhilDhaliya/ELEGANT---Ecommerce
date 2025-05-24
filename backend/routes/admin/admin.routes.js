import express from "express";
import { createProduct ,deleteProduct, updateProduct } from "../../controllers/product.controller.js";
import { createAdmin, loginAdmin, logout  } from "../../controllers/admin.controller.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create-admin", createAdmin); 
router.post("/login-admin", loginAdmin);
router.post("/logout-admin",adminMiddleware, logout); 
router.post("/create-product",adminMiddleware, createProduct);
router.post("/delete-product/:id",adminMiddleware, deleteProduct);
router.post("/update-product/:id",adminMiddleware, updateProduct);

export default router;