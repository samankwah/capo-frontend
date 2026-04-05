import useDocumentTitle from "../hooks/useDocumentTitle";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const DemoNotice = () => {
  useDocumentTitle("Demo");
  return (
    <div>
      <div className="animated-bg min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-xl p-10 text-center">

          {/* Badge */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
              ⚠️ Demo Mode
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🎧 Demo Website
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            This website is a demonstration project created to showcase
            front-end development, UI design, and e-commerce functionality.
          </p>

          {/* Warning Box */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg mb-6 text-sm">
            No real transactions, logins, or data storage happen on this site.
          </div>

          <p className="text-gray-700 dark:text-gray-200 mb-8">
            If you're interested in building a website like this for your
            business or brand, contact me using any of the platforms below.
          </p>

          {/* Contact Icons */}
          <div className="flex flex-wrap justify-center gap-8 text-3xl">
            <a
              href="mailto:christoonz221@gmail.com"
              className="hover:text-red-500 transition transform hover:scale-110"
            >
              <FaEnvelope />
            </a>

            <a
              href="tel:+1239039550193"
              className="hover:text-green-600 transition transform hover:scale-110"
            >
              <FaPhone />
            </a>

            <a
              href="https://wa.me/2349039550193"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://x.com/ChrisToonz_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition transform hover:scale-110"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.instagram.com/official_chris_topher"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition transform hover:scale-110"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@__christ0pher__"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition transform hover:scale-110"
            >
              <FaTiktok />
            </a>

            <a
              href="https://github.com/Chriswebofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 transition transform hover:scale-110"
            >
              <FaGithub />
            </a>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              🏠 Back to Home
            </Link>

            <Link
              to="/shop"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              🛒 Continue Shopping
            </Link>
          </div>

          <p className="mt-10 text-sm text-gray-600 dark:text-gray-400">
            Developed by <b>Balogun Christopher</b>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoNotice;