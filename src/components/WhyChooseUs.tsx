import { motion } from "framer-motion";
import {
  FiTruck,
  FiShield,
  FiStar,
  FiHeadphones,
} from "react-icons/fi";
import type { ReactElement } from "react";

type Feature = {
  icon: ReactElement; 
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <FiTruck size={28} />,
    title: "Fast Delivery",
    description: "Quick and reliable delivery across all locations.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Payments",
    description: "Your transactions are protected with top-level security.",
  },
  {
    icon: <FiStar size={28} />,
    title: "Premium Quality",
    description: "Only original and high-quality products guaranteed.",
  },
  {
    icon: <FiHeadphones size={28} />,
    title: "24/7 Support",
    description: "Our support team is always ready to help you.",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }, // ✅ fixed
  },
};

const iconFloat = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as const, // ✅ fixed
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold mb-4"
        >
          Why Choose TipToe?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 md:mb-14"
        >
          We provide the best mobile devices and accessories with top-notch service.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm transition-all"
            >
              <motion.div
                variants={iconFloat}
                animate="animate"
                className="text-green-600 mb-5 flex justify-center"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
