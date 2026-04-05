import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const CartPage = () => {
  useDocumentTitle("Cart");
  const { cart, increaseQty, decreaseQty, removeItem, clearCart, totalPrice } =
    useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/profile", { state: { from: "/cart" } });
      return;
    }
    const num = `CAPO-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div>
        <div className="min-h-screen pt-24 px-4 md:px-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <FiCheckCircle className="mx-auto text-green-600 mb-4" size={56} />
            <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Thank you for your order. Your order number is:
            </p>
            <p className="bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded font-mono text-lg font-bold mb-6">
              {orderNumber}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              This is a demo store. No real payment has been processed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="px-6 py-3 border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen pt-24 px-4 md:px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Your cart is empty.</p>
              <Link
                to="/shop"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-red-600 text-sm hover:underline mt-2"
                >
                  Clear Cart
                </button>
              </div>

              {/* Summary */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 h-fit sticky top-28">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Items ({itemCount}):</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t dark:border-gray-600 pt-4 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-semibold"
                >
                  Place Order
                </button>
                <Link
                  to="/shop"
                  className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
