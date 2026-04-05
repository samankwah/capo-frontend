import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import { FiCreditCard, FiSmartphone, FiShield, FiLock } from "react-icons/fi";

const paymentMethods = [
  {
    icon: <FiCreditCard size={28} />,
    title: "Credit & Debit Cards",
    description: "We accept Visa, Mastercard, and other major cards. Payments are processed securely via encrypted channels.",
  },
  {
    icon: <FiSmartphone size={28} />,
    title: "Mobile Money",
    description: "Pay conveniently with MTN MoMo, Vodafone Cash, or AirtelTigo Money. Available for all Ghanaian networks.",
  },
  {
    icon: <FiCreditCard size={28} />,
    title: "PayPal",
    description: "Use your PayPal account for quick and secure checkout, available for both local and international orders.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Cash on Delivery",
    description: "Pay when your order arrives. Available for deliveries within Accra Metro only.",
  },
];

const PaymentOptions = () => {
  useDocumentTitle("Payment Options");

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Payment Options
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            We offer multiple secure payment methods to make your shopping experience smooth and easy.
          </p>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="text-green-600 mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Security Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Secure Payments</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiLock className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  All transactions are encrypted with <strong>256-bit SSL</strong> to keep your data safe.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiShield className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We never store your card details. Payments are processed through trusted third-party providers.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiShield className="text-green-600 mt-1 shrink-0" size={20} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If you experience any payment issues, contact our support team for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentOptions;
