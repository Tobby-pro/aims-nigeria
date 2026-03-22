// src/pages/Signup.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";
import { registerMember } from "../api/auth";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Signup = () => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    emailRef.current?.focus();
  }, []);

  // ✅ Frontend validation
  const validateForm = () => {
    if (!email || !password) {
      setMessage("Please fill all fields.");
      return false;
    }

    // Basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }

    // Password length
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return false;
    }

    // Password strength (simple example: contains letters & numbers)
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!strongPassword.test(password)) {
      setMessage(
        "Password should contain letters and numbers for strength."
      );
      return false;
    }

    setMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      await registerMember(email, password);

      setMessage(
        "✅ Registration successful! Check your email to verify your account."
      );

      setEmail("");
      setPassword("");
    } catch (err: any) {
      setIsError(true);
      setMessage(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
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
        title="Become a Member"
        subtitle="Begin your professional journey with AIMS Nigeria"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* FORM */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Create Your Account
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                  placeholder="Enter your password"
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                disabled={loading}
                className={`w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center transition
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
              >
                {loading ? <LoadingSpinner /> : "Create Account"}
              </motion.button>

              {/* MESSAGE */}
              {message && (
                <p
                  className={`text-sm text-center mt-3 ${
                    isError ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>

          {/* IMAGE */}
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

export default Signup;