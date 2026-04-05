import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { products } from "../data/Product";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === id);
  useDocumentTitle(product?.name || "Product");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop" className="text-blue-500 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handlePlaceOrder = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
    });
    navigate("/cart");
  };

  return (
    <div>
      <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mt-24">
        {/* Image */}
        <div>
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

          <div className="mb-4">
            {product.discount ? (
              <>
                <span className="text-red-600 text-2xl font-bold mr-3">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="line-through text-gray-400">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-3 bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <span className="text-red-600 text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.inStock ? (
            <p className="text-green-600 font-semibold mb-4">In Stock</p>
          ) : (
            <p className="text-red-500 font-semibold mb-4">Out of Stock</p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded transition ${
                product.inStock
                  ? addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>

            <button
              disabled={!product.inStock}
              onClick={handlePlaceOrder}
              className={`px-6 py-3 rounded transition ${
                product.inStock
                  ? "border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  : "border border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>

          <Link
            to="/shop"
            className="block mt-6 text-blue-500 hover:underline"
          >
            &larr; Back to Shop
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
