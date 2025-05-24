import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 h-screen max-h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/6969268/pexels-photo-6969268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Elegant fashion collection" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Elevate Your Style This Season
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover our new collection of premium clothing designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/category/new-collection" 
              className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;