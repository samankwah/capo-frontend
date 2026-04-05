import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "https://phono-demo.myshopify.com/cdn/shop/files/phono-slider-3.jpg?v=1613704452&width=1780",
  "https://phono-demo.myshopify.com/cdn/shop/files/phono-slider-2.jpg?v=1613704452&width=1780",
  "https://phono-demo.myshopify.com/cdn/shop/files/phono-slider-1.jpg?v=1613704452&width=1780",
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">
          <motion.h1
            key={current}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Phones & Accessories <br className="hidden sm:block" />
            Built for Your Lifestyle
          </motion.h1>

          <motion.p
            key={current + "_p"}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-6 sm:mb-8 max-w-lg text-sm sm:text-base"
          >
            Discover premium smartphones, accessories, and storage solutions.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/shop">
              <button className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-md hover:bg-gray-200 transition text-sm sm:text-base w-full sm:w-auto">
                Shop Now
              </button>
            </Link>
            <Link to="/shop">
              <button className="border border-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md hover:bg-white hover:text-black transition text-sm sm:text-base w-full sm:w-auto">
                View Collection
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-40">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
