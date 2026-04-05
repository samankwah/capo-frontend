import { motion } from "framer-motion";

const PromoBanner = () => {
  return (
    <div className="overflow-hidden relative ">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }} // move background horizontally
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 8,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, #16a34a, #4ade80, #22c55e, #16a34a)", // green gradient
          backgroundSize: "300% 100%", // make gradient wide so it moves
        }}
      />

      {/* Scrolling text */}
      <motion.div
        className="relative whitespace-nowrap text-white text-center py-3 px-4 md:py-4 md:px-6 font-semibold text-sm md:text-lg"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      >
        🎉 Limited Time Offer! Get up to 30% off on all products! Use code: <span className="underline">CAPO30</span> 🛒 
      </motion.div>
    </div>
  );
};

export default PromoBanner;
