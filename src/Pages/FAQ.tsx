import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Capo?",
    answer:
      "Capo is a modern mobile retail brand offering smartphones, accessories, and stylish mobile covers with top-notch quality.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to multiple countries worldwide. Shipping costs may vary depending on location.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, PayPal, and other secure online payment methods.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have a 30-day return/exchange policy for unused products. Please contact our support team for assistance.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Domestic deliveries usually take 3-7 business days. International shipments may take longer depending on the destination.",
  },
  {
    question: "Do you offer warranty on products?",
    answer:
      "Yes, most of our products come with a manufacturer’s warranty. Check the product page for specific warranty details.",
  },
];

const FAQ: React.FC = () => {
  useDocumentTitle("FAQ");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            Find answers to common questions or search below.
          </p>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center p-5 focus:outline-none"
                  >
                    <span className="text-gray-800 dark:text-white font-medium">
                      {item.question}
                    </span>
                    <span
                      className={`text-blue-500 text-xl transform transition-transform duration-300 ${
                        activeIndex === index ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`px-5 text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
                      activeIndex === index ? "max-h-96 py-3" : "max-h-0"
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No FAQs matched your search.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;