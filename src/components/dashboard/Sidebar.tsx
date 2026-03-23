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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Sync sidebar width globally
  useEffect(() => {
    const width = expanded ? "14rem" : "4rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [expanded]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen 
          bg-gradient-to-b from-violet-900 via-indigo-800 to-violet-700 
          text-white flex flex-col transition-all duration-300
          md:relative
          ${mobileOpen ? "w-56" : "w-16 md:w-[var(--sidebar-width)]"}
        `}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo */}
        <div className="p-4 md:p-3 font-bold text-sm border-b border-white/30">
          {expanded || mobileOpen ? "AIMS Nigeria" : "AIMS"}
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4 space-y-1">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300
                  hover:shadow-lg hover:bg-indigo-600/30 ${
                    isActive ? "bg-indigo-600 shadow-md" : ""
                  }`
                }
              >
                <Icon size={18} className="flex-shrink-0 md:mr-3" />

                <span
                  className={`
                    text-xs md:text-sm font-medium transition-all duration-300
                    ${expanded || mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
                  `}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="relative w-full flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg hover:shadow-lg hover:bg-red-600/30 transition-all duration-300"
          >
            <LogOut size={18} className="flex-shrink-0 md:mr-3" />

            <span
              className={`
                text-xs md:text-sm font-medium transition-all duration-300
                ${expanded || mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
              `}
            >
              Logout
            </span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="absolute bottom-4 right-4 md:hidden p-2 rounded-full bg-white/20 text-white shadow-md hover:bg-white/30 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;