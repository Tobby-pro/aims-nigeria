// src/components/auth/ProtectedAdminRoute.tsx
import type { ReactNode } from "react"; // 🔹 type-only import
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

type Props = {
  children: ReactNode;
};

const ProtectedAdminRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  // ⏳ While checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // ❌ Not logged in → redirect to admin login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Logged in but not admin → redirect to admin login
  if (!user.is_admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Admin → allow access
  return <>{children}</>;
};

export default ProtectedAdminRoute;