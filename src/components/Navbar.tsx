import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSearch,
  FiXCircle,
  FiSun,
  FiMoon,
  FiLogOut,
} from "react-icons/fi";

import { products } from "../data/Product";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

// Define Product type inline if not exported
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Country = {
  code: string;
  name: string;
};

const countries: Country[] = [
  { code: "GH", name: "Ghana" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
];

const searchProductsAPI = async (query: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { countryCode, setCountryCode } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [openCountry, setOpenCountry] = useState(false);
  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];
  const [mobileMenu, setMobileMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
    setMobileMenu(false);
    clearSearch();
  };

  const debouncedSearch = useCallback((query: string) => {
    if (query.length < 1) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    searchProductsAPI(query)
      .then((results) => {
        setSearchResults(results);
        setShowSearchResults(true);
      })
      .catch(() => setSearchResults([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(target)) {
        setShowSearchResults(false);
      }
      if (openCountry && countryDropdownRef.current && !countryDropdownRef.current.contains(target)) {
        setOpenCountry(false);
      }
      if (openUserMenu && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCountry, openUserMenu]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const isActive = (path: string) =>
    location.pathname === path ? "text-green-600 font-semibold" : "";

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm fixed top-0 left-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">
            <Link to="/" onClick={() => setMobileMenu(false)}>CAPO</Link>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className={`hover:text-green-600 ${isActive("/")}`}>Home</Link>
            </li>
            <li>
              <Link to="/shop" className={`hover:text-green-600 ${location.pathname.startsWith("/shop") ? "text-green-600 font-semibold" : ""}`}>Shop</Link>
            </li>
            <li>
              <Link to="/about" className={`hover:text-green-600 ${isActive("/about")}`}>About Us</Link>
            </li>
            <li>
              <Link to="/blog" className={`hover:text-green-600 ${isActive("/blog")}`}>Blog</Link>
            </li>
            <li>
              <Link to="/faq" className={`hover:text-green-600 ${isActive("/faq")}`}>FAQ</Link>
            </li>
            <li>
              <Link to="/contact" className={`hover:text-green-600 ${isActive("/contact")}`}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block" ref={desktopSearchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 border dark:border-gray-600 rounded-lg w-64 dark:bg-gray-800 dark:text-white"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              {searchQuery && (
                <button type="button" onClick={clearSearch} className="absolute right-3 top-3 text-gray-400">
                  <FiXCircle />
                </button>
              )}
            </form>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mt-1 rounded-md shadow-md z-20 max-h-64 overflow-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <span className="text-sm">{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-green-700 transition"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  (user.displayName || user.email || "U").charAt(0).toUpperCase()
                )}
              </button>
              {openUserMenu && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-md w-48 z-20 py-2">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setOpenUserMenu(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setOpenUserMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FiLogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/profile" className="hover:text-green-600"><FiUser size={20} /></Link>
          )}

          <Link to="/Cart" className="relative">
            <FiShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Country */}
          <div className="relative" ref={countryDropdownRef}>
            <button
              onClick={() => setOpenCountry(!openCountry)}
              className="flex items-center space-x-2 border dark:border-gray-600 px-3 py-1 rounded-md"
            >
              <ReactCountryFlag svg countryCode={selectedCountry.code} style={{ width: "1.2em", height: "1.2em" }} />
              <span className="text-sm">{selectedCountry.code}</span>
              <FiChevronDown className={`w-4 h-4 ${openCountry ? "rotate-180" : ""}`} />
            </button>

            {openCountry && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-md w-44 z-20">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setCountryCode(country.code);
                      setOpenCountry(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ReactCountryFlag svg countryCode={country.code} style={{ width: "1.2em", height: "1.2em" }} />
                    <span className="text-sm">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            <Link to="/" onClick={() => setMobileMenu(false)} className={isActive("/")}>Home</Link>
            <Link to="/shop" onClick={() => setMobileMenu(false)} className={location.pathname.startsWith("/shop") ? "text-green-600 font-semibold" : ""}>Shop</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)} className={isActive("/about")}>About Us</Link>
            <Link to="/blog" onClick={() => setMobileMenu(false)} className={isActive("/blog")}>Blog</Link>
            <Link to="/faq" onClick={() => setMobileMenu(false)} className={isActive("/faq")}>FAQ</Link>
            <Link to="/contact" onClick={() => setMobileMenu(false)} className={isActive("/contact")}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;