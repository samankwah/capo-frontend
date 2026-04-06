import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Daniel A.",
    role: "Accra, Ghana",
    message:
      "TipToe delivered my phone faster than expected. Original product and great service!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Kumasi, Ghana",
    message:
      "Amazing experience. Customer support was very helpful and responsive.",
    rating: 4,
  },
  {
    name: "Michael T.",
    role: "Takoradi, Ghana",
    message:
      "Premium quality accessories. I’ll definitely shop here again.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 md:py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by customers across Ghana for quality and fast delivery.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex items-center mb-4 text-green-600">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                “{item.message}”
              </p>

              {/* User */}
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
