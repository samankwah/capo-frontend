import { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiChevronLeft, FiStar } from "react-icons/fi";
import Footer from "./Footer";
import { useCurrency } from "../context/CurrencyContext";

// Product type with rating
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number; // rating from 0 to 5
};

// Sample data
const sampleProducts: Product[] = [
  {
    id: "ssd-1",
    name: "Affinity M20",
    description:
      "High-speed SSD card with 256GB storage, perfect for mobile devices and cameras.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    category: "SSD Card",
    rating: 4,
  },
  {
    id: "apple-1",
    name: "iPhone 15 Pro",
    description:
      "6.1-inch Super Retina XDR display, A17 Pro chip, titanium design.",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    category: "Apple Products",
    rating: 5,
  },
  // Add more sample products as needed
];

const ProductDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();

  // Get product from navigation state or find in sample data
  const product =
    location.state?.product || sampleProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8"
          >
            <FiChevronLeft className="mr-2" />
            Back
          </button>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-300 mb-8 flex items-center flex-wrap gap-2">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-black">
            Collection
          </Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden p-6 md:p-8">
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

            {/* Dynamic Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                ({product.rating ? product.rating * 20 : 0} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-6">{product.description}</p>

            {/* Price & Stock */}
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold mr-4">{formatPrice(product.price)}</span>
              <span className="text-sm text-gray-500">GHS</span>
              <span className="ml-4 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded">
                In Stock
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700 dark:text-gray-200">Quantity:</span>
                <div className="flex items-center border dark:border-gray-600 rounded-lg">
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-black"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-black"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center font-medium">
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-black dark:border-white text-black dark:text-white py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center font-medium">
                  <FiHeart className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t dark:border-gray-700 pt-8">
              <h3 className="font-semibold text-lg mb-4">Product Details</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                <li className="flex">
                  <span className="w-32 font-medium">Category:</span>
                  <span>{product.category}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">SKU:</span>
                  <span>{product.id.toUpperCase()}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Warranty:</span>
                  <span>1 Year Manufacturer Warranty</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Shipping:</span>
                  <span>Free shipping on orders over $50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;