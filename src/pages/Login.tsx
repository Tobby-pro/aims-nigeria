// src/pages/Login.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";
import { loginMember } from "../api/auth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { refreshUser } = useAuth();

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    emailRef.current?.focus();
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ---------------- VALIDATIONS ----------------
    if (!email || !password) {
      setIsError(true);
      setMessage("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address (e.g., user@example.com).");
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setMessage("Password must be at least 8 characters.");
      return;
    }

    // ---------------- SUBMIT LOGIN ----------------
    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      await loginMember(email, password);

      await refreshUser();

      setIsError(false);
      setMessage("✅ Login successful! Redirecting...");

      const from = (location.state as any)?.from?.pathname || "/dashboard";
      setTimeout(() => navigate(from, { replace: true }), 1200);
    } catch (err: any) {
      setIsError(true);
      setMessage(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      <PageHeader
        title="Member Login"
        subtitle="Access your AIMS Nigeria account"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* ----------------- FORM ----------------- */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Login to Your Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none transition ${
                    isError && !validateEmail(email) ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none transition ${
                    isError && password.length < 8 ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your password"
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                disabled={loading}
                className={`w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center transition
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
              >
                {loading ? <LoadingSpinner /> : "Login"}
              </motion.button>

              {/* MESSAGE */}
              {message && (
                <p
                  className={`text-sm text-center mt-3 ${
                    message.includes("✅") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>

          {/* ----------------- IMAGE ----------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <img
              src="/images/login_pro01.png"
              alt="AIMS illustration"
              className="max-w-md w-full object-contain"
            />
          </motion.div>

        </div>
      </Container>
    </>
  );
};

export default Login;