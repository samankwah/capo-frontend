import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import{Link} from"react-router-dom";
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  useDocumentTitle("Contact");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <>
      {/* Page Content */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 px-6 min-h-screen transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            Have a question or want to collaborate? Send us a message!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg animate-fadeUp"
            >
              {submitted && (
                <p className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center font-semibold">
                  Message sent successfully!
                </p>
              )}

              {/* Name */}
              <div className="relative mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none py-2 transition dark:bg-transparent dark:text-white"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                  Name
                </label>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none py-2 transition dark:bg-transparent dark:text-white"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                  Email
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div className="relative mb-6">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none py-2 transition dark:bg-transparent dark:text-white"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                  Subject
                </label>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="relative mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 resize-none transition"
                  placeholder=" "
                ></textarea>
                <label className="absolute left-0 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                  Message
                </label>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <Link
                to="/demo">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
              </Link>
            </form>

            {/* Contact Info + Map */}
            <div className="space-y-6 animate-fadeUp">
              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">📍 15 TipToe Avenue, Osu, Accra</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">📞 +233 30 277 0000</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">✉️ contact@tiptoe.com</p>
              </div>

              {/* Embedded Google Map */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-64">
                <iframe
                  title="TipToe Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9!2d-0.1870!3d5.5560!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOsu%2C%20Accra!5e0!3m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;
