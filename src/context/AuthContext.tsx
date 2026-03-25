import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import API from "../api/auth";

// -----------------------
// Updated User type
// -----------------------
export interface User {
  id: number;
  email: string;
  is_admin: boolean;
}

// -----------------------
// Context type
// -----------------------
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>; // ✅ FIXED
}

// -----------------------
// Create context
// -----------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -----------------------
// Provider component
// -----------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch current user from backend
  const refreshUser = async (): Promise<User | null> => {
    try {
      const res = await API.get("/members/me");
      setUser(res.data.data);
      return res.data.data; // ✅ RETURN USER
    } catch (err) {
      setUser(null);
      return null; // ✅ RETURN NULL
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await API.post("/members/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  // ✅ Load user on app start
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// -----------------------
// Custom hook
// -----------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};