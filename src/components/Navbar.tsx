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
  FiHome,
  FiBox,
  FiInfo,
  FiBookOpen,
  FiHelpCircle,
  FiMail,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import { products } from "../data/Product";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

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

type MobileNavItem = {
  label: string;
  path: string;
  icon: IconType;
  match?: (pathname: string) => boolean;
  badge?: string | number;
};

const countries: Country[] = [
  { code: "GH", name: "Ghana" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
];

const DEFAULT_AVATAR = "/default-avatar.svg";

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
  const { countryCode, currency, setCountryCode } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [profilePhotoFailed, setProfilePhotoFailed] = useState(false);
  const [defaultAvatarFailed, setDefaultAvatarFailed] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  const primaryMobileNav: MobileNavItem[] = [
    { label: "Home", path: "/", icon: FiHome },
    {
      label: "Shop",
      path: "/shop",
      icon: FiBox,
      match: (pathname) =>
        pathname.startsWith("/shop") || pathname.startsWith("/product/"),
    },
    { label: "About Us", path: "/about", icon: FiInfo },
    { label: "Blog", path: "/blog", icon: FiBookOpen },
    { label: "FAQ", path: "/faq", icon: FiHelpCircle },
    { label: "Contact", path: "/contact", icon: FiMail },
  ];

  const secondaryMobileNav: MobileNavItem[] = [
    {
      label: "Cart",
      path: "/cart",
      icon: FiShoppingCart,
      badge: cart.length > 0 ? cart.length : undefined,
      match: (pathname) => pathname.toLowerCase() === "/cart",
    },
  ];

  const closeMobileMenu = useCallback(() => {
    setMobileMenu(false);
    setMobileCountryOpen(false);
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
    closeMobileMenu();
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
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(target)
      ) {
        setShowSearchResults(false);
      }
      if (
        openCountry &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(target)
      ) {
        setOpenCountry(false);
      }
      if (
        openUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCountry, openUserMenu]);

  useEffect(() => {
    closeMobileMenu();
    setOpenUserMenu(false);
    setOpenCountry(false);
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  useEffect(() => {
    setProfilePhotoFailed(false);
    setDefaultAvatarFailed(false);
  }, [user?.photoURL]);

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

  const userInitial = (user?.displayName || user?.email || "U").charAt(0).toUpperCase();
  const avatarSrc = !profilePhotoFailed && user?.photoURL
    ? user.photoURL
    : !defaultAvatarFailed
      ? DEFAULT_AVATAR
      : null;

  const handleAvatarError = () => {
    if (!profilePhotoFailed && user?.photoURL) {
      setProfilePhotoFailed(true);
      return;
    }

    setDefaultAvatarFailed(true);
  };

  const isActive = (path: string) =>
    location.pathname === path ? "text-green-600 font-semibold" : "";

  const isMobileNavActive = (item: MobileNavItem) =>
    item.match ? item.match(location.pathname) : location.pathname === item.path;

  const renderMobileNavLink = (item: MobileNavItem) => {
    const Icon = item.icon;
    const active = isMobileNavActive(item);

    return (
      <Link
        key={item.label}
        to={item.path}
        onClick={closeMobileMenu}
        className={`flex items-center justify-between rounded-xl px-4 py-2.5 transition ${
          active
            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        <span className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              active
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <Icon size={16} />
          </span>
          <span className="text-sm font-medium">{item.label}</span>
        </span>
        {item.badge ? (
          <span className="min-w-6 rounded-full bg-gray-900 px-2 py-0.5 text-center text-xs font-semibold text-white dark:bg-white dark:text-black">
            {item.badge}
          </span>
        ) : (
          <FiChevronDown className="-rotate-90 text-gray-400" size={16} />
        )}
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b bg-white shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold">
              <Link to="/" onClick={closeMobileMenu}>
                TipToe
              </Link>
            </h1>

            <ul className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <li>
                <Link to="/" className={`hover:text-green-600 ${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`hover:text-green-600 ${
                    location.pathname.startsWith("/shop")
                      ? "text-green-600 font-semibold"
                      : ""
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`hover:text-green-600 ${isActive("/about")}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`hover:text-green-600 ${isActive("/blog")}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={`hover:text-green-600 ${isActive("/faq")}`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:text-green-600 ${isActive("/contact")}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block" ref={desktopSearchRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg border py-2 pl-10 pr-10 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    <FiXCircle />
                  </button>
                )}
              </form>

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="text-sm">{product.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/cart" className="relative">
              <FiShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={user.displayName || "User"}
                      className="h-8 w-8 rounded-full object-cover"
                      onError={handleAvatarError}
                    />
                  ) : (
                    userInitial
                  )}
                </button>
                {openUserMenu && (
                  <div className="absolute right-0 mt-2 z-20 w-48 rounded-md border bg-white py-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b px-4 py-2 dark:border-gray-700">
                      <p className="truncate text-sm font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setOpenUserMenu(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpenUserMenu(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/profile" className="hover:text-green-600">
                <FiUser size={20} />
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="hidden rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 md:block"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <div className="relative hidden md:block" ref={countryDropdownRef}>
              <button
                onClick={() => setOpenCountry(!openCountry)}
                className="flex items-center space-x-2 rounded-md border px-3 py-1 dark:border-gray-600"
              >
                <ReactCountryFlag
                  svg
                  countryCode={selectedCountry.code}
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <span className="text-sm">{selectedCountry.code}</span>
                <FiChevronDown
                  className={openCountry ? "rotate-180" : ""}
                  size={16}
                />
              </button>

              {openCountry && (
                <div className="absolute right-0 mt-2 z-20 w-44 rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setCountryCode(country.code);
                        setOpenCountry(false);
                      }}
                      className="flex w-full items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ReactCountryFlag
                        svg
                        countryCode={country.code}
                        style={{ width: "1.2em", height: "1.2em" }}
                      />
                      <span className="text-sm">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="rounded-md p-1 md:hidden"
              onClick={() => setMobileMenu((prev) => !prev)}
              aria-label="Open menu"
              aria-expanded={mobileMenu}
              aria-controls="mobile-drawer"
            >
              {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-[1px] transition-opacity duration-200 md:hidden ${
          mobileMenu ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenu}
      />

      <aside
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(86vw,360px)] flex-col overflow-hidden border-l bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-gray-700 dark:bg-gray-900 md:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileMenu}
      >
        <div className="border-b px-4 pb-3 pt-4 dark:border-gray-700">
          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/70">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-600 text-base font-semibold text-white">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={user?.displayName || "User"}
                    className="h-full w-full object-cover"
                    onError={handleAvatarError}
                  />
                ) : (
                  userInitial
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user?.displayName || "Guest"}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "Sign in to manage your account"}
                </p>
              </div>
            </div>
            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300"
            >
              <FiUser size={15} />
              {user ? "View profile" : "Go to sign in"}
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-4 py-3">
          <div className="space-y-1">{primaryMobileNav.map(renderMobileNavLink)}</div>

          <div className="mt-4 border-t pt-4 dark:border-gray-700">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
              Account
            </p>
            <div className="space-y-1">
              {secondaryMobileNav.map(renderMobileNavLink)}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20">
                      <FiLogOut size={16} />
                    </span>
                    <span className="text-sm font-medium">Sign Out</span>
                  </span>
                  <FiChevronDown className="-rotate-90 text-red-300" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t px-4 py-3 dark:border-gray-700">
          <div className="rounded-2xl border bg-gray-50/80 p-3 dark:border-gray-700 dark:bg-gray-800/60">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Preferences
                </p>
                <p className="truncate text-sm font-medium">
                  {selectedCountry.name} · {currency.code}
                </p>
              </div>

              <button
                onClick={() => setMobileCountryOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                aria-expanded={mobileCountryOpen}
                aria-label="Select country and currency"
              >
                <ReactCountryFlag
                  svg
                  countryCode={selectedCountry.code}
                  style={{ width: "1.1em", height: "1.1em" }}
                />
                <span>{selectedCountry.code}</span>
                <FiChevronDown
                  className={mobileCountryOpen ? "rotate-180" : ""}
                  size={16}
                />
              </button>
            </div>

            {mobileCountryOpen && (
              <div className="mt-3 space-y-1 border-t pt-3 dark:border-gray-700">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setCountryCode(country.code);
                      setMobileCountryOpen(false);
                      closeMobileMenu();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left transition ${
                      country.code === selectedCountry.code
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                        : "hover:bg-white dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <ReactCountryFlag
                        svg
                        countryCode={country.code}
                        style={{ width: "1.1em", height: "1.1em" }}
                      />
                      <span className="text-sm font-medium">{country.name}</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {country.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
