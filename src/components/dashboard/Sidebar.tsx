// src/components/dashboard/Sidebar.tsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  Award,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: BookOpen, label: "Training Programs", path: "/dashboard/training" },
  { icon: GraduationCap, label: "My Courses", path: "/dashboard/courses" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ✅ Sync sidebar width globally
  useEffect(() => {
    const width = expanded ? "14rem" : "4rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [expanded]);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300`}
      style={{
        width: expanded ? "14rem" : "4rem",
      }}
    >
      {/* Logo */}
      <div className="p-4 font-bold text-sm border-b border-gray-700">
        {expanded ? "AIMS Nigeria" : "AIMS"}
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center px-4 py-3 ${
                  isActive
                    ? "bg-indigo-600"
                    : "hover:bg-indigo-600/80"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              <span
                className={`absolute left-12 whitespace-nowrap text-sm font-medium
                  transition-all duration-300 ease-out
                  ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 pointer-events-none"
                  }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="relative w-full flex items-center px-4 py-3 hover:bg-red-600/80"
        >
          <LogOut size={20} className="flex-shrink-0" />

          <span
            className={`absolute left-12 whitespace-nowrap text-sm font-medium
              transition-all duration-300 ease-out
              ${
                expanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }`}
          >
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;