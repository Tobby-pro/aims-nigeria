import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.7,
        ease: "linear",
      }}
    />
  );
};

export default LoadingSpinner;