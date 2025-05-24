import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  // Fetch cart from backend once on mount or after user login
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart/getCart", {
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Compute total quantity
  const totalQuantity = cart.items.reduce(    //read the comment at last.
    (acc, item) => acc + item.quantity,
    0
  );

  // Example: function to add item, then refresh cart
  const addToCart = async (productId, quantity) => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/addToCart",
        {
          items: [{ productId, quantity }],
        },
        { withCredentials: true }
      );
      await fetchCart();
    } catch (error) {
      console.error("Add to cart failed", error.response?.data || error.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `http://localhost:3000/api/cart/updateCartItem/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      await fetchCart(); // trigger re-render and update quantity globally
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };
  
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/cart/removeFromCart/${productId}`,
        {
          withCredentials: true,
        }
      );
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  

  return (
    <CartContext.Provider
  value={{ cart, totalQuantity, addToCart, updateQuantity, removeItem, fetchCart }}
>
      {children}
    </CartContext.Provider>
  );
};

// Hook for consuming
export const useCart = () => useContext(CartContext);



/*
Your cart items array looks like this:

js
Copy
Edit
[
  { productId: "abc123", quantity: 2 },
  { productId: "xyz456", quantity: 5 },
  { productId: "qwe789", quantity: 1 },
]
You want to get the total number of items in the cart, which is the sum of all the quantity values.

Using reduce:

js
Copy
Edit
const totalQuantity = cart.items.reduce((acc, item) => {
  return acc + item.quantity;
}, 0);
acc starts at 0 (the initial value).

For each item in items, you add item.quantity to acc.

After processing all items, acc becomes the sum of all quantities.*/
