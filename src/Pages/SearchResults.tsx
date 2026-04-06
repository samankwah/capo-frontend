import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiStar,
  FiX,
} from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { products as allProductsData } from "../data/Product";
import type { Product } from "../data/Product";
import { useCurrency } from "../context/CurrencyContext";
import Footer from "../components/Footer";

const sortOptions = [
  { value: "relevance", label: "Relevance", mobileLabel: "Relevance" },
  { value: "price-low", label: "Price (Lowest)", mobileLabel: "Price (Lowest)" },
  { value: "price-high", label: "Price (Highest)", mobileLabel: "Price (Highest)" },
  { value: "name", label: "Name", mobileLabel: "Name" },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  useDocumentTitle(query ? `Search: ${query}` : "Search Results");

  const { formatPrice } = useCurrency();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 16000]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  let products: Product[] = allProductsData;

  if (query.trim()) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()) ||
      product.category.toLowerCase().includes(query.toLowerCase().trim()) ||
      product.description.toLowerCase().includes(query.toLowerCase().trim())
    );
  }

  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const inPrice =
      product.price >= priceRange[0] &&
      product.price <= priceRange[1];

    return inCategory && inPrice;
  });

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

  const categories = [
    "All",
    ...Array.from(new Set(allProductsData.map((p) => p.category))),
  ];

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const maxPrice = Math.max(...allProductsData.map((p) => p.price), 1000);

  return (
    <div className="min-h-screen px-4 pt-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">
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
          <div className="hidden w-full flex-shrink-0 md:block md:w-64">
            <div className="sticky top-32 rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
              <div className="mb-8">
                <h3 className="mb-4 font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex w-full justify-between rounded-lg p-2 ${
                        selectedCategory === category
                          ? "bg-black text-white dark:bg-white dark:text-black"
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

              <div className="mb-8">
                <h3 className="mb-4 font-medium">Price Range</h3>

                <div className="mb-2 flex justify-between text-sm">
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

              <div className="mb-8">
                <h3 className="mb-4 font-medium">Sort By</h3>

                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`mb-2 block w-full rounded p-2 ${
                      sortBy === option.value
                        ? "bg-black text-white dark:bg-white dark:text-black"
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
                className="w-full rounded-lg border py-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between gap-3 md:hidden">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    view === "grid"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800"
                  }`}
                  aria-label="Grid view"
                >
                  <FiGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    view === "list"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800"
                  }`}
                  aria-label="List view"
                >
                  <FiList size={16} />
                </button>
              </div>

              <div className="relative min-w-0 max-w-[220px] flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-600 shadow-sm outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  aria-label="Sort search results"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.mobileLabel}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-5"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`cursor-pointer overflow-hidden rounded-xl border bg-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 ${
                      view === "list" ? "flex items-center gap-4 p-4" : ""
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                      className={
                        view === "list"
                          ? "h-28 w-28 rounded-lg object-cover"
                          : "h-48 w-full object-cover"
                      }
                    />

                    <div className={view === "list" ? "flex-1" : "p-4"}>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                        {product.category}
                      </span>

                      <h3 className="mt-2 font-bold">{product.name}</h3>

                      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                        {product.description}
                      </p>

                      <div className="mt-3 flex justify-between">
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
              <div className="py-20 text-center">
                <FiSearch size={40} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold">No products found</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Try another search.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="rounded bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
                >
                  Go Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="fixed right-0 top-1/2 z-30 flex h-14 w-12 -translate-y-1/2 items-center justify-center rounded-l-xl bg-gray-900 text-white shadow-[0_10px_28px_rgba(15,23,42,0.35)] transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 md:hidden"
        aria-label="Open filters"
      >
        <FiFilter size={20} strokeWidth={2.5} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-[1px] transition-opacity duration-200 md:hidden ${
          mobileFiltersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden={!mobileFiltersOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(84vw,340px)] flex-col overflow-hidden border-l bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-gray-700 dark:bg-gray-900 md:hidden ${
          mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileFiltersOpen}
      >
        <div className="border-b px-5 pb-5 pt-6 dark:border-gray-700">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                Search
              </p>
              <h2 className="mt-1 text-lg font-semibold">Filters</h2>
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="rounded-full border p-2 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Close filters"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-8">
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
                Price Range
              </h3>
              <div className="rounded-2xl bg-gray-50 px-4 py-4 dark:bg-gray-800">
                <div className="mb-3 flex justify-between text-sm">
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
                    <span className="text-xs">
                      {category === "All"
                        ? products.length
                        : products.filter((p) => p.category === category).length}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="border-t px-5 py-4 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, 16000]);
                setSortBy("relevance");
                setView("grid");
              }}
              className="flex-1 rounded-xl border px-4 py-3 text-sm font-medium dark:border-gray-600"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="flex-1 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              Apply
            </button>
          </div>
        </div>
      </aside>

      <Footer />
    </div>
  );
};

export default SearchResults;
