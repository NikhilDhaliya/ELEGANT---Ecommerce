
import Cart from "../models/cart.js";
import Product from "../models/product.js";


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error("Cart Fetch Error:", err); 
    res.status(500).json({ message: "Error fetching cart." });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body; 

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      items.forEach(({ productId, quantity }) => {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      });
    } else {
      cart = new Cart({
        user: userId,
        items,
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ message: "Error adding to cart." });
  }
};


export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart." });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1); 
    } else {
      cart.items[itemIndex].quantity = quantity; 
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Update Cart Error:", err);
    res.status(500).json({ message: "Error updating cart." });
  }
};


export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { productId: productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found." });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item." });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared." });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart." });
  }
};
