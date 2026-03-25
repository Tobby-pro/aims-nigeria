// src/pages/AdminLogin.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";
import PageHeader from "../components/layout/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { loginMember } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { refreshUser, user } = useAuth(); // ✅ use user directly

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    emailRef.current?.focus();
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setIsError(true);
      setMessage("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      // ✅ login (sets cookie)
      await loginMember(email, password);

      // ✅ refresh user from backend
      await refreshUser();

      // ✅ wait a tiny bit for context to update
      setTimeout(() => {
        if (!user?.is_admin) {
          setIsError(true);
          setMessage("❌ Not an admin account.");
          setLoading(false);
          return;
        }

        setMessage("✅ Admin login successful! Redirecting...");

        const from =
          (location.state as any)?.from?.pathname || "/admin/dashboard";

        setTimeout(() => navigate(from, { replace: true }), 1000);
      }, 300);

    } catch (err: any) {
      console.error("Admin login failed:", err);
      setIsError(true);
      setMessage(
        err?.response?.data?.message || "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      <PageHeader
        title="Admin Login"
        subtitle="Restricted access for administrators only"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 flex justify-center">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Admin Access
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
                  className={`w-full rounded-md border px-3 py-2 text-sm ${
                    isError && !validateEmail(email)
                      ? "border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="admin@example.com"
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
                  className={`w-full rounded-md border px-3 py-2 text-sm ${
                    isError && password.length < 8
                      ? "border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                disabled={loading}
                className={`w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {loading ? <LoadingSpinner /> : "Login as Admin"}
              </motion.button>

              {message && (
                <p
                  className={`text-sm text-center mt-3 ${
                    message.includes("✅")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </>
  );
};

export default AdminLogin;