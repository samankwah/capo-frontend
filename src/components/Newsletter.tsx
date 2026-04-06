import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="bg-green-600 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Get Exclusive Deals & Updates
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 text-green-100 max-w-xl mx-auto"
        >
          Subscribe to receive special offers, discounts, and the latest products from TipToe.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-5 py-3 rounded-md text-black dark:text-white dark:bg-gray-800 outline-none"
          />

          <button
            type="submit"
            className="bg-black px-6 py-3 rounded-md hover:bg-gray-800 transition font-semibold"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
