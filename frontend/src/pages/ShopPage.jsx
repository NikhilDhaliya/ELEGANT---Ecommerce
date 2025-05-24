import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, XCircle } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import axios from 'axios';

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Rating: High to Low', value: 'rating-desc' }
];

const priceRanges = [
  { name: 'Under $50', min: 0, max: 50 },
  { name: '$50 to $100', min: 50, max: 100 },
  { name: '$100 to $200', min: 100, max: 200 },
  { name: 'Over $200', min: 200, max: null }
];

const categories = [
  'All',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Dresses',
  'Shoes',
  'Accessories'
];

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortBy, setSortBy] = useState('newest');
  const [priceFilter, setPriceFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const fetched = await fetchProducts();
      setAllProducts(fetched);
    };
    fetchAndSetProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...allProducts];

    // Filter by category
    if (categoryFilter !== 'All') {
      updatedProducts = updatedProducts.filter(p => p.category === categoryFilter);
    }

    // Filter by price
    if (priceFilter) {
      updatedProducts = updatedProducts.filter(p => {
        if (priceFilter.max === null) return p.price >= priceFilter.min;
        return p.price >= priceFilter.min && p.price <= priceFilter.max;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        updatedProducts.sort((a, b) => b.rating - a.rating); // assuming rating exists
        break;
      case 'newest':
      default:
        updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // assuming createdAt exists
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [allProducts, sortBy, priceFilter, categoryFilter]);

  const clearFilters = () => {
    setPriceFilter(null);
    setCategoryFilter('All');
    setSortBy('newest');
  };

  const hasActiveFilters = priceFilter !== null || categoryFilter !== 'All' || sortBy !== 'newest';

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop All Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters (left) */}
          <div className="hidden lg:block w-64">
            <div className="bg-white p-6 rounded-lg shadow sticky top-24">
              <h2 className="text-lg font-medium mb-4">Filters</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                {categories.map(cat => (
                  <div key={cat} className="flex items-center space-x-2 mb-1">
                    <input
                      type="radio"
                      name="category"
                      id={`cat-${cat}`}
                      checked={categoryFilter === cat}
                      onChange={() => setCategoryFilter(cat)}
                      className="form-radio"
                    />
                    <label htmlFor={`cat-${cat}`} className="text-sm text-gray-700">{cat}</label>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Price</h3>
                {priceRanges.map((range, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-1">
                    <input
                      type="radio"
                      name="price"
                      id={`price-${i}`}
                      checked={priceFilter?.min === range.min && priceFilter?.max === range.max}
                      onChange={() => setPriceFilter(range)}
                      className="form-radio"
                    />
                    <label htmlFor={`price-${i}`} className="text-sm text-gray-700">{range.name}</label>
                  </div>
                ))}
              </div>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="w-full text-sm text-blue-600 hover:underline mt-4">
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Product section */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center flex-wrap gap-4">
              <button
                className="lg:hidden flex items-center text-gray-700"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </button>

              <div>
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product grid or no results */}
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} products found</p>
                <ProductGrid products={filteredProducts} />
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="text-blue-600 hover:underline text-sm">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
