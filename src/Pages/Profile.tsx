import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FiEye, FiEyeOff, FiLogOut, FiUser, FiMail, FiCalendar, FiShield, FiPackage, FiHeart, FiMapPin, FiSettings, FiChevronRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const getFirebaseErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-medium dark:text-white">{value}</span>
  </div>
);

const ActionCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.06)" }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 text-left w-full"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-green-600">{icon}</div>
        <div>
          <p className="text-sm font-semibold dark:text-white">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <FiChevronRight className="text-gray-400" size={16} />
    </div>
    <span className="inline-block mt-3 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">Coming soon</span>
  </motion.div>
);

const AuthPage = () => {
  useDocumentTitle("Profile");
  const { user, loading: authLoading, signUp, signIn, signInWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";
  const wasLoggedOut = useRef(!user);

  useEffect(() => {
    if (user && wasLoggedOut.current) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.fullName);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      setError(getFirebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      setError(getFirebaseErrorMessage(code));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      setError("Failed to log out. Please try again.");
    }
  };

  // Loading state while Firebase initializes
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Logged-in profile view
  if (user) {
    return (
      <AnimatePresence mode="wait">
      <motion.div
        key="profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors"
      >
        {/* ── Banner ── */}
        <div className="relative">
          <div className="h-48 sm:h-56 bg-gradient-to-r from-gray-900 via-gray-800 to-green-900 dark:from-gray-950 dark:via-gray-900 dark:to-green-950" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-6 -mt-20 relative z-10"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Avatar */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-green-600 flex items-center justify-center shrink-0 -mt-20 sm:-mt-24">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-4xl sm:text-5xl font-bold">
                    {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Identity */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">
                  {user.displayName || "User"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                    <FiCalendar size={12} />
                    Member since {user.metadata.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "N/A"}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${
                    user.emailVerified
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  }`}>
                    <FiShield size={12} />
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Account Details ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold dark:text-white mb-5">Account Information</h2>
              <div className="space-y-0">
                <InfoRow icon={<FiUser size={16} />} label="Display Name" value={user.displayName || "Not set"} />
                <InfoRow icon={<FiMail size={16} />} label="Email" value={user.email || "N/A"} />
                <InfoRow
                  icon={<FcGoogle size={16} />}
                  label="Sign-in Provider"
                  value={user.providerData?.[0]?.providerId === "google.com" ? "Google" : "Email & Password"}
                />
                <InfoRow icon={<FiShield size={16} />} label="Email Verified" value={user.emailVerified ? "Yes" : "No"} />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold dark:text-white mb-5">Account Activity</h2>
              <div className="space-y-0">
                <InfoRow icon={<FiCalendar size={16} />} label="Member Since" value={
                  user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : "N/A"
                } />
                <InfoRow icon={<FiCalendar size={16} />} label="Last Sign-In" value={
                  user.metadata.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : "N/A"
                } />
                <InfoRow icon={<FiUser size={16} />} label="Account ID" value={user.uid.slice(0, 16) + "..."} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Quick Actions ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 pb-12"
        >
          <h2 className="text-lg font-semibold dark:text-white mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard icon={<FiPackage size={22} />} title="Order History" description="View your past orders" />
            <ActionCard icon={<FiHeart size={22} />} title="Wishlist" description="Items you've saved" />
            <ActionCard icon={<FiMapPin size={22} />} title="Address Book" description="Manage delivery addresses" />
            <ActionCard icon={<FiSettings size={22} />} title="Account Settings" description="Update your preferences" />
          </div>
        </motion.section>

        {/* ── Danger Zone ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 pb-16"
        >
          <div className="border border-red-200 dark:border-red-900/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sign out of your account on this device.
            </p>
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              <FiLogOut size={16} />
              Sign Out
            </button>
          </div>
        </motion.section>

        <Footer />
      </motion.div>
      </AnimatePresence>
    );
  }

  // Sign-in / Sign-up form
  return (
    <AnimatePresence mode="wait">
    <motion.div
      key="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">

          <h1 className="text-2xl font-bold mb-6 text-center">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded text-sm text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isSignIn && (
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200"
              }`}
            >
              {loading
                ? "Please wait..."
                : isSignIn
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t dark:border-gray-600" />
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t dark:border-gray-600" />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
            {isSignIn
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
              }}
              className="text-green-600 font-medium hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </motion.div>
    </AnimatePresence>
  );
};

export default AuthPage;
