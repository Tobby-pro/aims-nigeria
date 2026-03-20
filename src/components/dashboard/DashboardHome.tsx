// components/dashboard/DashboardHome.tsx
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { initiatePayment, verifyPayment } from "../../api/payments";
import { payWithPaystack } from "../../utils/paystack";
import { useState, useEffect } from "react";
import API from "../../api/auth"; // reuse same axios instance

type UserStatus = {
  id: number;
  email: string;
  is_member: boolean; // ✅ membership flag
};

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  // ✅ Fetch current user info on load
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const { data } = await API.get("/members/me");
        setUserStatus(data.data);
      } catch (err: any) {
        console.error("Failed to fetch user status:", err);
        setError("Could not fetch user info ❌");
      }
    };
    fetchUserStatus();
  }, []);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // STEP 1: Get payment details from backend
      const { data } = await initiatePayment("membership_registration");
      const { reference, email, amount, publicKey } = data;

      // STEP 2: Use reusable Paystack utility
      payWithPaystack({
        email,
        amount,
        reference,
        publicKey,
        programId: "membership_registration",
        onSuccess: async (ref: string) => {
          try {
            await verifyPayment(ref);

            alert("Payment verified 🎉");

            // ✅ Refresh user status after successful payment
            const { data: updatedUser } = await API.get("/members/me");
            setUserStatus(updatedUser);
          } catch (err: any) {
            console.error("Payment verification failed:", err);
            setError(
              err?.response?.data?.message || "Payment verification failed ❌"
            );
          } finally {
            setLoading(false);
          }
        },
        onClose: () => {
          console.log("Payment cancelled by user");
          setLoading(false);
        },
      });
    } catch (err: any) {
      console.error("Payment initialization error:", err);
      setError(
        err?.response?.data?.message || "Payment initialization failed ❌"
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to AIMS Nigeria
      </h1>

      {/* Error UI */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Membership Status</h3>
          <p className="text-lg font-semibold mt-2">
            {userStatus
              ? userStatus.is_member
                ? "Active"
                : "Inactive"
              : "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Training Programs</h3>
          <p className="text-lg font-semibold mt-2">7 Available</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Certifications</h3>
          <p className="text-lg font-semibold mt-2">--</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
            <BookOpen size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Membership Activation
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Membership activation fee enables you to access all professional
              resources.
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleRegister}
          disabled={loading || (userStatus?.is_member ?? false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {userStatus?.is_member
            ? "Paid"
            : loading
            ? "Processing..."
            : "Pay Membership Fee"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DashboardHome;