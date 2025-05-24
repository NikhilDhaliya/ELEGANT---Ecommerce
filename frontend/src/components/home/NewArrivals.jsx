import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../product/ProductGrid";
import axios from "axios";


const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const NewArrivals = () => {
  const [products, setProducts] = useState([]); 

  useEffect(() => {   // useEffect is a React hook that runs a function after the component is rendered.
    const fetchAndSetProducts = async () => {
      const fetched = await fetchProducts();
      setProducts(fetched);
    };
    fetchAndSetProducts();
  }, []); 

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
          <Link 
            to="/shop" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <ProductGrid products={products} />  
      </div>
    </section>
  );
};

export default NewArrivals;
