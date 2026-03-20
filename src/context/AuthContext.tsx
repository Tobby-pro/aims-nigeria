// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import API from "../api/auth"; // ✅ use your shared axios instance

// Define the shape of the user
interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch current user from backend
  const refreshUser = async () => {
    try {
      const res = await API.get("/members/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null); // Not logged in
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function (production-safe)
  const logout = async () => {
    try {
      await API.post("/members/logout");
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      // 🔥 Always clear user locally
      setUser(null);
    }
  };

  // ✅ Load user on app start
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};