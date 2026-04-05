import { useSearchParams, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FiSearch, FiStar } from "react-icons/fi";
import { products as allProductsData } from "../data/Product";
import type { Product } from "../data/Product";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  useDocumentTitle(query ? `Search: ${query}` : "Search Results");

  const { formatPrice } = useCurrency();

  // UI state only (no derived data state)
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 16000]);
  const [sortBy, setSortBy] = useState<string>("relevance");

  // ✅ FILTER PRODUCTS (no useEffect needed)
  let products: Product[] = allProductsData;

  if (query.trim()) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()) ||
      product.category.toLowerCase().includes(query.toLowerCase().trim()) ||
      product.description.toLowerCase().includes(query.toLowerCase().trim())
    );
  }

  
  // ✅ FILTER BY CATEGORY & PRICE
  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const inPrice =
      product.price >= priceRange[0] &&
      product.price <= priceRange[1];

    return inCategory && inPrice;
  });
  // ✅ SORT
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // ✅ CATEGORIES (derived, no state needed)
  const categories = [
    "All",
    ...Array.from(new Set(allProductsData.map((p) => p.category))),
  ];

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const maxPrice = Math.max(...allProductsData.map((p) => p.price), 1000);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{filteredProducts.length} products found</span>
            {query && (
              <button
                onClick={() => navigate("/search")}
                className="text-black hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-32">

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full p-2 rounded-lg flex justify-between ${
                        selectedCategory === category
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-xs">
                        {category === "All"
                          ? products.length
                          : products.filter((p) => p.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price Range</h3>

                <div className="flex justify-between text-sm mb-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Sort By</h3>

                {[
                  { value: "relevance", label: "Relevance" },
                  { value: "price-low", label: "Low to High" },
                  { value: "price-high", label: "High to Low" },
                  { value: "name", label: "Name" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full p-2 rounded mb-2 ${
                      sortBy === option.value
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 16000]);
                  setSortBy("relevance");
                }}
                className="w-full py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
                  >
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {product.category}
                      </span>

                      <h3 className="font-bold mt-2">{product.name}</h3>

                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between mt-3">
                        <span className="font-bold">
                          {formatPrice(product.price)}
                        </span>
                        <FiStar />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FiSearch size={40} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold">No products found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try another search.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded"
                >
                  Go Home
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchResults;