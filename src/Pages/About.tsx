import { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";

const About = () => {
  useDocumentTitle("About");
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Daniel A.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review:
        "TipToe has the best mobile covers I’ve ever purchased. The quality is excellent and delivery was super fast!",
    },
    {
      name: "Grace M.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      review:
        "Affordable prices and genuine products. I highly recommend TipToe for anyone looking for reliable accessories.",
    },
    {
      name: "James K.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
      review:
        "Customer service was outstanding. They helped me choose the perfect phone and cover combination.",
    },
    {
      name: "Sophia L.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      review:
        "Very stylish products and fast delivery. I will definitely shop again!",
    },
  ];

  const slides = [testimonials.slice(0, 2), testimonials.slice(2, 4)];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white py-20 px-6 text-center animate-fadeUp">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About TipToe
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Technology made stylish, affordable, and accessible for everyone.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6 max-w-6xl mx-auto animate-fadeUp">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Who We Are
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              TipToe is a modern mobile retail brand focused on delivering
              high-quality smartphones, stylish mobile covers, and premium accessories.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We combine innovation, affordability, and elegant design
              to enhance your digital lifestyle.
            </p>
          </div>

          <div>
            <img
              loading="lazy"
              src="https://phono-demo.myshopify.com/cdn/shop/files/abo-03.jpg?v=1621512246&width=750"
              alt="Mobile accessories"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6 animate-fadeUp">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-gray-100 dark:bg-gray-700 p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To provide genuine mobile products and deliver outstanding
              customer service with every purchase.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become a trusted global brand in mobile technology
              known for quality and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center animate-fadeUp">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Christopher ",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1502767089025-6572583495b0",
            },
            {
              name: "Sarah Johnson",
              role: "Marketing Manager",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            },
            {
              name: "Michael Smith",
              role: "Sales Manager",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                loading="lazy"
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 px-6 animate-fadeUp">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12">
            Thus Spoke Our Customers
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="grid md:grid-cols-2 gap-8 transition-all duration-700 ease-in-out"
              key={currentSlide}
            >
              {slides[currentSlide].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">
                  <div className="flex items-center mb-6">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        {i < item.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{item.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-10 space-x-6">
            <button
              onClick={prevSlide}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Prev
            </button>

            <button
              onClick={nextSlide}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-black" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 text-center px-6 animate-fadeUp">
        <h2 className="text-3xl font-bold mb-4">
          Discover Style. Experience Technology.
        </h2>
        <p className="text-gray-400 mb-6">
          Explore our collection today and find the perfect device for you.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </section>
      <Footer />

    </div>
  );
};

export default About;
