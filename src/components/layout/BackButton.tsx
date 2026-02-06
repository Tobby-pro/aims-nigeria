// components/layout/BackButton.tsx
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
  fallbackPath?: string; // optional default route if history is empty
}

const BackButton = ({ fallbackPath = "/" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // go back if possible, else go to fallback
    if (window.history.state?.idx && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="
        flex items-center gap-2 
        text-sm sm:text-base 
        text-indigo-600 hover:text-indigo-500 
        font-medium transition
        mb-4
      "
    >
      <FiArrowLeft />
      
    </button>
  );
};

export default BackButton;
