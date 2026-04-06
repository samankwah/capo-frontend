import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import ankerLogo from "../assets/Logos/anker.svg";
import appleLogo from "../assets/Logos/apple.svg";
import jblLogo from "../assets/Logos/jbl.svg";
import samsungLogo from "../assets/Logos/samsung.svg";
import tecnoLogo from "../assets/Logos/tecno.svg";
import oneplusLogo from "../assets/Logos/oneplus.svg";
import oraimoLogo from "../assets/Logos/oraimo.png";
import itelLogo from "../assets/Logos/itel.svg";
import xiaomiLogo from "../assets/Logos/xiaomi.svg";
import hotwavLogo from "../assets/Logos/hotwav.png";

const brands = [
  { name: "Apple", logo: appleLogo },
  { name: "Samsung", logo: samsungLogo },
  { name: "Xiaomi", logo: xiaomiLogo },
  { name: "JBL", logo: jblLogo },
  { name: "Anker", logo: ankerLogo },
  { name: "TECNO", logo: tecnoLogo },
  { name: "OnePlus", logo: oneplusLogo },
  { name: "oraimo", logo: oraimoLogo },
  { name: "itel", logo: itelLogo },
  { name: "HOTWAV", logo: hotwavLogo },
];

const BrandLogos = () => {
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      setSequenceWidth(sequenceRef.current?.getBoundingClientRect().width ?? 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="py-14 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-8 md:mb-10 tracking-wide uppercase"
        >
          Trusted by Top Brands
        </motion.p>

        <div className="relative overflow-hidden py-6 md:py-8">
          <motion.div
            className="flex w-max items-center"
            animate={sequenceWidth > 0 ? { x: [0, -sequenceWidth] } : undefined}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                ref={groupIndex === 0 ? sequenceRef : undefined}
                aria-hidden={groupIndex > 0}
                className="flex shrink-0 items-center gap-3 md:gap-10 pr-3 md:pr-10"
              >
                {brands.map((brand) => (
                  <div
                    key={`${groupIndex}-${brand.name}`}
                    className="flex shrink-0 items-center justify-center w-[104px] md:w-[200px]"
                  >
                    <img
                      loading="lazy"
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 md:h-14 max-w-[84px] md:max-w-[180px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent md:w-32" />
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
