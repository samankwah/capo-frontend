import { useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { FiCheck, FiChevronDown, FiFilter, FiGrid, FiList } from "react-icons/fi";
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

const sortOptions = [
  { value: "Low-High", label: "Price (Lowest)" },
  { value: "High-Low", label: "Price (Highest)" },
  { value: "A-Z", label: "Name (A - Z)" },
  { value: "Z-A", label: "Name (Z - A)" },
];

const Shop = () => {
  useDocumentTitle("Shop");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Low-High");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const { cart, addToCart, increaseQty, decreaseQty, removeItem, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

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
  } else if (sortBy === "Z-A") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "Low-High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "High-Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
    <div className="flex flex-col gap-8 p-4 pt-24 md:flex-row md:p-6 relative">
      {/* Sidebar */}
      <div className="hidden md:block w-full md:w-1/4 md:sticky md:top-24 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow h-max">
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
          <div className="mb-6 hidden items-center justify-between gap-3 md:flex">
          <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                view === "grid"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                view === "list"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              List
            </button>
          </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white p-2.5 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between border-b border-gray-200 bg-white pb-4 md:hidden dark:border-gray-700 dark:bg-transparent">
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${
                view === "grid"
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              aria-label="Grid view"
            >
              <FiGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${
                view === "list"
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              aria-label="List view"
            >
              <FiList size={18} />
            </button>
          </div>

          <div className="relative flex min-w-0 items-center gap-2">
            <span className="text-[13px] font-medium tracking-[0.12em] text-gray-500 dark:text-gray-400">
              sort by
            </span>
            <button
              type="button"
              onClick={() => setMobileSortOpen((open) => !open)}
              className="flex min-w-0 flex-1 items-center justify-between gap-2 bg-transparent py-1 pr-5 text-[13px] font-medium text-gray-800 outline-none dark:text-gray-200"
              aria-label="Sort products"
            >
              <span className="truncate">{sortOptions.find((option) => option.value === sortBy)?.label}</span>
            </button>
            <FiChevronDown
              size={15}
              className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-300 transition ${
                mobileSortOpen ? "rotate-180" : ""
              }`}
            />

            {mobileSortOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default bg-transparent"
                  onClick={() => setMobileSortOpen(false)}
                  aria-label="Close sort menu"
                />
                <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[154px] max-w-[220px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] dark:border-gray-300 dark:bg-white">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setMobileSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] ${
                        sortBy === option.value
                          ? "bg-gray-100 font-medium text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && <FiCheck size={14} className="text-black" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={view === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4 md:space-y-6"}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`relative rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 ${
                view === "list" ? "flex items-start gap-4 p-3.5 md:items-center md:gap-6 md:p-4" : ""
              }`}
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
                className={`${
                  view === "grid"
                    ? "h-48 w-full"
                    : "h-28 w-28 shrink-0 rounded-lg bg-gray-50 p-2 md:h-40 md:w-40 md:rounded-none md:bg-transparent md:p-0"
                } object-contain dark:bg-gray-700/40 md:dark:bg-transparent`}
              />

              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-lg ${view === "list" ? "mt-0 text-base leading-5 md:text-lg" : "mt-3"}`}>
                  {product.name}
                </h3>
                <p
                  className={`text-sm text-gray-500 dark:text-gray-400 ${
                    view === "list" ? "mt-1 line-clamp-2 leading-5" : ""
                  }`}
                >
                  {product.description}
                </p>
                <p className={`font-bold text-red-600 ${view === "list" ? "mt-2 text-base" : "mt-1 text-lg"}`}>
                  {formatPrice(product.price)}
                </p>

                <div className={`mt-4 flex gap-2 ${view === "list" ? "flex-col sm:flex-row sm:items-center" : ""}`}>
                  <button
                    className={`rounded-lg bg-black text-white transition hover:bg-gray-800 ${
                      view === "list"
                        ? "px-3 py-2 text-sm font-medium sm:min-w-[88px]"
                        : "flex-1 py-2.5"
                    }`}
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
                    className={`rounded-lg border text-center transition hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black ${
                      view === "list"
                        ? "px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-100"
                        : "flex-1 border-black py-2.5 dark:border-white"
                    }`}
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

    <button
      type="button"
      onClick={() => setMobileFiltersOpen(true)}
      className="md:hidden fixed right-0 top-1/2 z-30 flex h-12 w-10 -translate-y-1/2 items-center justify-center bg-gray-900 text-white shadow-[0_2px_8px_rgba(15,23,42,0.14)] transition hover:bg-black dark:bg-white dark:text-black dark:shadow-[0_2px_8px_rgba(255,255,255,0.08)] dark:hover:bg-gray-100"
      aria-label="Open filters"
    >
      <FiFilter size={20} strokeWidth={2.5} />
    </button>

    <div
      className={`md:hidden fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-[1px] transition-opacity duration-200 ${
        mobileFiltersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => setMobileFiltersOpen(false)}
      aria-hidden={!mobileFiltersOpen}
    />

    <aside
      className={`md:hidden fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(84vw,340px)] flex-col overflow-hidden border-l bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-gray-700 dark:bg-gray-900 ${
        mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!mobileFiltersOpen}
    >
      <div className="border-b px-5 pb-5 pt-6 dark:border-gray-700">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setInStockOnly(false);
              setView("grid");
              setSortBy("Low-High");
            }}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-8">
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Availability
            </h3>
            <label className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
              />
              <span>In Stock Only</span>
            </label>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Sort By
            </h3>
             <select
               value={sortBy}
               onChange={(e) => {
                 setSortBy(e.target.value);
                 setMobileFiltersOpen(false);
               }}
               className="w-full rounded-xl border p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
             >
               {sortOptions.map((option) => (
                 <option key={option.value} value={option.value}>
                   {option.label}
                 </option>
               ))}
             </select>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setMobileFiltersOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                    selectedCategory === category
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{category}</span>
                  {selectedCategory === category && <span className="text-xs font-semibold">Active</span>}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

    </aside>
  

    <Footer />
    </div>
  );
};

export default Shop;
