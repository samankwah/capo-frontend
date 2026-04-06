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
      <div className="mx-auto mt-24 grid max-w-6xl gap-8 px-4 py-6 sm:px-6 md:grid-cols-2 md:gap-10 md:px-8">
        {/* Image */}
        <div>
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="h-[280px] w-full object-contain sm:h-[340px] md:h-[400px]"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">{product.description}</p>

          <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
            {product.discount ? (
              <>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="line-through text-gray-400">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded bg-red-100 px-2 py-1 text-sm text-red-600">
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className={`rounded px-6 py-3 transition sm:flex-1 ${
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
              className={`rounded px-6 py-3 transition sm:flex-1 ${
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
            className="mt-6 inline-block text-blue-500 hover:underline"
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
