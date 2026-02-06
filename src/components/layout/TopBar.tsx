// components/layout/TopBar.tsx
import { FiClock, FiSmartphone, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../Container";

const TopBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-100 text-gray-600 text-xs sm:text-sm"
    >
      <Container>
        <div className="flex justify-between items-center h-10">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
              Mon-Fri: 8am - 5pm
            </span>
            <span className="flex items-center gap-1">
              <FiSmartphone className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
              WhatsApp: +234 810 305 9590
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="flex items-center gap-1 hover:text-gray-900 transition text-xs sm:text-sm"
            >
              <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
              Admin Login
            </a>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default TopBar;
