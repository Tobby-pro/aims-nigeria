// src/pages/Login.tsx

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation for redirect
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";
import { loginMember } from "../api/auth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ capture previous route
  const formRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { refreshUser } = useAuth();

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    emailRef.current?.focus();
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Login API
      await loginMember(email, password);

      // ✅ Refresh auth context
      await refreshUser();

      setMessage("✅ Login successful. Redirecting...");

      // ✅ Determine redirect path
      const from = (location.state as any)?.from?.pathname || "/dashboard";

      setTimeout(() => {
        navigate(from, { replace: true }); // SPA redirect to previous page
      }, 1200);

    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Login failed. Please try again."
      );
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center transition"
              >
                {loading ? <LoadingSpinner /> : "Login"}
              </motion.button>

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