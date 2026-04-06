import { motion } from "framer-motion";

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 8,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, #16a34a, #4ade80, #22c55e, #16a34a)",
          backgroundSize: "300% 100%",
        }}
      />

      <motion.div
        className="relative px-4 py-3 text-center text-sm font-semibold text-white md:px-6 md:py-4 md:text-lg"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      >
        <span className="inline-block whitespace-nowrap">
          Limited Time Offer! Get up to 30% off on all products! Use code:{" "}
          <span className="underline">TIPTOE30</span>
        </span>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
