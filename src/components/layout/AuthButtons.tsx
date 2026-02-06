import { FiLogIn, FiUserPlus } from "react-icons/fi";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <a
        href="/login"
        className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
      >
        <FiLogIn />
        Login
      </a>
      <a
        href="/signup"
        className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
      >
        <FiUserPlus />
        Sign Up
      </a>
    </div>
  );
};

export default AuthButtons;
