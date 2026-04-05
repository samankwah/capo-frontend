import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { products } from "../data/Product"; // Changed from Products to products
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Phones",
  "Tablets",
  "Audio",
  "Wearables",  
  "Accessories",
  "Iphone Cables",
  "Type c Cables",
  "C to C Cables",
];

const Shop = () => {
  useDocumentTitle("Shop");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("A-Z");

  const { cart, addToCart, increaseQty, decreaseQty, removeItem, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  let filteredProducts = [...products]; // Changed from Products to products

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  }

  if (sortBy === "A-Z") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Low-High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "High-Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
    <div className="flex flex-col md:flex-row p-6 gap-8 relative">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:sticky md:top-24 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow h-max">
        <h2 className="text-lg font-bold mb-4">Filter</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Availability</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
            />
            In Stock Only
          </label>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-500"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Cart in Sidebar */}
        <div className="mt-8 border-t pt-4">
          <h2 className="font-bold text-lg mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <div className="flex gap-2 items-center">
                    <button
                      className="px-2 border dark:border-gray-600 rounded"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="px-2 border dark:border-gray-600 rounded"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="px-2 border dark:border-gray-600 rounded text-red-600"
                      onClick={() => removeItem(item.id)}
                    >
                      x
                    </button>
                  </div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t dark:border-gray-600 pt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      
      <div className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 border dark:border-gray-600 ${view === "grid" ? "bg-black text-white dark:bg-white dark:text-black" : "dark:text-gray-300"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 border dark:border-gray-600 ${view === "list" ? "bg-black text-white dark:bg-white dark:text-black" : "dark:text-gray-300"}`}
            >
              List
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border dark:border-gray-600 p-2 rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="A-Z">Alphabetically, A-Z</option>
            <option value="Low-High">Price, Low to High</option>
            <option value="High-Low">Price, High to Low</option>
          </select>
        </div>

        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-gray-800 p-4 rounded shadow relative ${view === "list" ? "flex gap-6 items-center" : ""}`}
            >
              {!product.inStock && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
                  Sold Out
                </span>
              )}

              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className={`${view === "grid" ? "w-full h-48" : "w-40 h-40"} object-contain`}
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg mt-3">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{product.description}</p>
                <p className="text-red-600 font-bold text-lg mt-1">{formatPrice(product.price)}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    onClick={() =>
                      addToCart({ 
                        id: product.id, 
                        name: product.name, 
                        price: product.price,
                        image: product.image 
                      })
                    }
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 text-center border border-black dark:border-white py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  

    <Footer />
    </div>
  );
};

export default Shop;