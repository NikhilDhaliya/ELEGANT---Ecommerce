import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, id) => (
        <ProductCard key={id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex gap-2">
            {!isLoggedIn && (
              <Link to="/login">
                <button
                  className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => addToCart(product._id, 1)}
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <button
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => addToCart(product._id, 1)}
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            )}

            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="absolute top-2 left-2">
          <span className="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>

      <Link to={`/product/${product.id}`}>
        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-700 mt-1">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductGrid;
