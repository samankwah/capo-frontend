import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        {/* COMPANY INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:col-span-1"
        >
          <h2 className="text-white text-2xl font-bold mb-4">TipToe</h2>
          <p className="text-gray-400 text-sm">
            Premium mobile devices, accessories, and tech solutions. Fast
            delivery and reliable support.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* CUSTOMER SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-white transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-white transition">
                Returns
              </Link>
            </li>
            <li>
              <Link
                to="/payment-options"
                className="hover:text-white transition"
              >
                Payment Options
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* SOCIAL & NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="md:col-span-1"
        >
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <FiFacebook size={20} className="hover:text-white cursor-pointer" />
            <FiInstagram
              size={20}
              className="hover:text-white cursor-pointer"
            />
            <FaXTwitter size={20} className="hover:text-white cursor-pointer" />
            <FiYoutube size={20} className="hover:text-white cursor-pointer" />
          </div>

          <p className="text-sm mb-2">Subscribe for updates:</p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="w-full min-w-0 flex-1 rounded-md px-3 py-2 text-sm text-black outline-none dark:bg-gray-800 dark:text-white"
            />
            <button className="w-full rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-500 sm:w-auto">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-gray-800 px-6 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TipToe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
