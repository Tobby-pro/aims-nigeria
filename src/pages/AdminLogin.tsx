// src/pages/AdminLogin.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../components/Container";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // 🔹 use AuthContext

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { refreshUser } = useAuth(); // 🔹 refresh context after login

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

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post(
        "/api/members/login",
        { email, password },
        { withCredentials: true } // important for cookie auth
      );

      // 🔹 Refresh global user state
      await refreshUser();

      // Check if user is admin
      if (!res.data.data.is_admin) {
        setIsError(true);
        setMessage("❌ Not an admin account.");
        setLoading(false);
        return;
      }

      setIsError(false);
      setMessage("✅ Admin login successful! Redirecting...");

      const from = (location.state as any)?.from?.pathname || "/admin/dashboard";
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err: any) {
      console.error("Admin login failed:", err);
      setIsError(true);
      setMessage(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="pt-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-bold text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? <LoadingSpinner /> : "Login"}
          </button>

          {message && (
            <p className={`text-sm mt-2 text-center ${isError ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </Container>
  );
};

export default AdminLogin;