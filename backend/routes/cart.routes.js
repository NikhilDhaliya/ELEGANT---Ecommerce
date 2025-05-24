import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/getCart', getCart);
router.post('/addToCart', addToCart);
router.put('/updateCartItem/:productId', updateCartItem);
router.delete('/removeFromCart/:productId', removeFromCart);
router.delete('/clearCart', clearCart);

export default router;
