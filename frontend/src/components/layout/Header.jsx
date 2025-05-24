import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { totalQuantity, fetchQuantity } = useCart();

  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(user?.isLoggedIn || false);
  }, [setIsLoggedIn]);

    /*

  Yes, you can store and read isLoggedIn from localStorage.

But always read localStorage in useEffect and update state from there.

Don't call setState directly during render phase (outside hooks).

  */

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }  //tells the browser to send cookies with the request
      );
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-evenly gap-20 h-16 md:h-20">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-gray-800 hover:text-blue-500"
          >
            ELEGANT
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingBag
                className="h-5 w-5 cursor-pointer"
                onClick={fetchQuantity} 
              />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalQuantity}
              </span>
            </Link>

            {isLoggedIn ? (
              <Link
                onClick={handleLogout}
                to="/"
                className="btn btn-primary border-1 font-semibold hover:text-blue-300 text-gray-800 hover:-translate-y-1"
              >
                Logout
              </Link>
            ) : (
              <div className="buttons flex gap-3 ">
                <Link
                  to="/login"
                  className="btn btn-primary border-1 font-semibold hover:text-blue-300 text-gray-800 hover:-translate-y-1"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary border-1 font-semibold hover:text-blue-300 text-gray-800 hover:-translate-y-1"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 py-2">
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 hover:text-blue-600 py-2">
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 py-2">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 py-2">
                Contact
              </Link>
              {isLoggedIn ? (
                <Link
                  onClick={handleLogout}
                  to="/"
                  className="text-gray-700 hover:text-blue-600 py-2"
                >
                  Logout
                </Link>
              ) : (
                <div className="buttons flex gap-3 ">
                  <Link
                    to="/login"
                    className="btn btn-primary border-1 font-semibold hover:text-blue-300 text-gray-800 hover:-translate-y-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary border-1 font-semibold hover:text-blue-300 text-gray-800 hover:-translate-y-1"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
