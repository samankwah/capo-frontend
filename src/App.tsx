import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { PageSkeleton } from "./components/skeletons";

const Home = React.lazy(() => import("./Pages/Home"));
const ProductDetails = React.lazy(() => import("./Pages/ProductDetails"));
const Blog = React.lazy(() => import("./Pages/Blog"));
const SearchResults = React.lazy(() => import("./Pages/SearchResults"));
const About = React.lazy(() => import("./Pages/About"));
const Contact = React.lazy(() => import("./Pages/Contact"));
const FAQ = React.lazy(() => import("./Pages/FAQ"));
const Shop = React.lazy(() => import("./Pages/Shop"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const DemoNotice = React.lazy(() => import("./Pages/DemoNotice"));
const Shipping = React.lazy(() => import("./Pages/Shipping"));
const Returns = React.lazy(() => import("./Pages/Returns"));
const PaymentOptions = React.lazy(() => import("./Pages/PaymentOptions"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
    <CurrencyProvider>
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/demo" element={<DemoNotice />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
          </Routes>
        </Suspense>
      </AuthProvider>
      </BrowserRouter>
    </CartProvider>
    </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
