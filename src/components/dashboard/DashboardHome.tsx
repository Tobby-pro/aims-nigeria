import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Zap, Star, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { initiatePayment, verifyPayment } from "../../api/payments";
import { payWithPaystack } from "../../utils/paystack";
import API from "../../api/auth";

type UserStatus = {
  id: number;
  email: string;
  is_member: boolean;
};

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

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
      const { data } = await initiatePayment("membership_registration");
      const { reference, email, amount, publicKey } = data;

      payWithPaystack({
        email,
        amount,
        reference,
        publicKey,
        programId: "membership_registration",
        onSuccess: async (ref: string) => {
          try {
            await verifyPayment(ref);
            const { data: updatedUser } = await API.get("/members/me");
            setUserStatus(updatedUser);
          } catch (err: any) {
            setError("Payment verification failed ❌");
          } finally {
            setLoading(false);
          }
        },
        onClose: () => setLoading(false),
      });
    } catch (err: any) {
      setError("Payment initialization failed ❌");
      setLoading(false);
    }
  };

  // ✅ Extract name from email
  const displayName = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() +
      user.email.split("@")[0].slice(1)
    : "User";

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* --- GREETING SECTION --- */}
      <motion.div variants={itemVars} className="space-y-1">
        <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, <span className="text-indigo-600">{displayName}</span> 👋
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-widest">
          AIMS Nigeria Member Dashboard
        </p>
      </motion.div>

      {/* --- ERROR ALERT --- */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl shadow-sm"
        >
          <AlertCircle size={20} />
          <p className="text-sm font-semibold">{error}</p>
        </motion.div>
      )}

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { 
            label: "Membership", 
            value: userStatus?.is_member ? "Active" : "Inactive", 
            icon: ShieldCheck,
            color: userStatus?.is_member ? "text-emerald-600" : "text-amber-500",
            bg: userStatus?.is_member ? "bg-emerald-50" : "bg-amber-50"
          },
          { label: "Training Programs", value: "7 Programs", icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Certifications", value: "0 Earned", icon: Star, color: "text-violet-600", bg: "bg-violet-50" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVars}
            whileHover={{ y: -5 }}
            className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 transition-all"
          >
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
              <p className={`text-base md:text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CTA SECTION --- */}
      <motion.div
        variants={itemVars}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 rounded-3xl p-6 md:p-10 shadow-2xl shadow-indigo-200"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-xl">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Professional Membership
              </h3>
              <p className="text-indigo-100/80 text-sm md:text-base mt-2 leading-relaxed">
                Activate your account to unlock professional certifications, global networking resources, and advanced curriculum access.
              </p>
            </div>
          </div>

          <motion.button
            onClick={handleRegister}
            disabled={loading || (userStatus?.is_member ?? false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full lg:w-auto px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-3
              ${userStatus?.is_member 
                ? "bg-emerald-500 text-white cursor-default" 
                : "bg-white text-indigo-900 hover:bg-indigo-50"}
              disabled:opacity-70
            `}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : userStatus?.is_member ? (
              <>
                <ShieldCheck size={20} />
                Account Verified
              </>
            ) : (
              "Pay Membership Fee"
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* --- PLACEHOLDER --- */}
      <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-8 flex items-center justify-center text-center">
          <p className="text-gray-400 text-sm font-medium italic">
            Your recent training activity will appear here.
          </p>
        </div>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-8 flex items-center justify-center text-center">
          <p className="text-gray-400 text-sm font-medium italic">
            Latest AIMS publications coming soon.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;