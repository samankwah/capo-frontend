import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import { FiTruck, FiGlobe, FiClock, FiPackage } from "react-icons/fi";

const shippingMethods = [
  {
    icon: <FiTruck size={28} />,
    title: "Standard Shipping",
    time: "5 - 7 Business Days",
    price: "Free on orders over GHS 500",
  },
  {
    icon: <FiClock size={28} />,
    title: "Express Shipping",
    time: "2 - 3 Business Days",
    price: "GHS 50",
  },
  {
    icon: <FiPackage size={28} />,
    title: "Same-Day Delivery",
    time: "Within 24 Hours",
    price: "GHS 80 (Accra only)",
  },
  {
    icon: <FiGlobe size={28} />,
    title: "International Shipping",
    time: "10 - 15 Business Days",
    price: "Varies by destination",
  },
];

const Shipping = () => {
  useDocumentTitle("Shipping");

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Shipping Information
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            We deliver across Ghana and internationally. Here's everything you need to know about our shipping options.
          </p>

          {/* Shipping Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {shippingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="text-green-600 mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{method.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{method.time}</p>
                <p className="text-gray-700 font-medium text-sm">{method.price}</p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Things to Know</h2>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Order Processing</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Orders are processed within 1-2 business days after payment confirmation. You'll receive a tracking number via email once your order ships.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Tracking Your Order</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Once shipped, you can track your order using the tracking link sent to your email. For any issues, reach out to our{" "}
                <Link to="/contact" className="text-green-600 hover:underline">support team</Link>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Delivery Areas</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We deliver to all regions in Ghana. Same-day delivery is currently available in Accra Metro only. International shipping covers most countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
