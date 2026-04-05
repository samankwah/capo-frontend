import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";

const steps = [
  {
    step: "1",
    title: "Contact Us",
    description: "Reach out to our support team within 30 days of receiving your order.",
  },
  {
    step: "2",
    title: "Get Approval",
    description: "We'll review your request and send you a return authorization.",
  },
  {
    step: "3",
    title: "Ship It Back",
    description: "Pack the item in its original packaging and ship it to us.",
  },
  {
    step: "4",
    title: "Get Refunded",
    description: "Once received and inspected, your refund will be processed within 5-7 business days.",
  },
];

const Returns = () => {
  useDocumentTitle("Returns");

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Returns & Exchanges
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            Not happy with your purchase? We make returns simple and hassle-free.
          </p>

          {/* Return Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Policy Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Return Policy</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Items can be returned within <strong>30 days</strong> of delivery.</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Products must be unused, in original packaging, and in the same condition you received them.</p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Exchanges are available for the same product in a different variant (color, size, etc.).</p>
              </div>
              <div className="flex items-start gap-3">
                <FiRefreshCw className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Refunds are processed to the original payment method within 5-7 business days.</p>
              </div>
            </div>
          </div>

          {/* Non-returnable */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Non-Returnable Items</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiXCircle className="text-red-500 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Screen protectors and tempered glass (once opened)</p>
              </div>
              <div className="flex items-start gap-3">
                <FiXCircle className="text-red-500 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Earphones and headphones (for hygiene reasons)</p>
              </div>
              <div className="flex items-start gap-3">
                <FiXCircle className="text-red-500 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Products with physical damage caused by the customer</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition font-medium"
            >
              Start a Return <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Returns;
