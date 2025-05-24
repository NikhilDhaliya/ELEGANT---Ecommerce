import React from "react";
import { useCart } from "../context/CartContext";


const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const cartItems = cart.items || [];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const total = subtotal ;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500">Add some items to your cart to continue shopping.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={item.productId?.image || "https://via.placeholder.com/120x100?text=No+Image"}
                    alt={item.productId?.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-grow mt-4 sm:mt-0 sm:ml-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {item.productId?.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {item.productId?.category}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.productId._id, item.quantity - 1);
                          } else {
                            removeItem(item.productId._id);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 font-bold text-gray-600"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-lg font-semibold text-gray-900 min-w-[100px] text-right">
                    ₹{(item.productId?.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="w-full lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>₹0</span>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
