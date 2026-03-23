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
  Menu,
  X,
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
  const [forceExpanded, setForceExpanded] = useState(false); // toggled by click
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Sync sidebar width for desktop
  useEffect(() => {
    const width = expanded || forceExpanded ? "14rem" : "4rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [expanded, forceExpanded]);

  // Toggle expansion on click (desktop)
  const handleClickSidebar = () => {
    setForceExpanded(!forceExpanded);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen flex flex-col
          bg-gradient-to-b from-violet-900 via-indigo-800 to-violet-700
          text-white shadow-lg
          transition-transform duration-300 ease-in-out
          md:relative
          ${mobileOpen ? "translate-x-0 w-56" : "-translate-x-56 w-56 md:w-[var(--sidebar-width)]"}
        `}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={handleClickSidebar} // click anywhere toggles desktop expansion
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 md:p-3 border-b border-white/30">
          <span className="font-bold text-sm md:text-base">
            {expanded || forceExpanded || mobileOpen ? "AIMS Nigeria" : "AIMS"}
          </span>
          {/* Mobile close button */}
          <button
            className="md:hidden p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering desktop toggle
              setMobileOpen(false);
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4 flex flex-col space-y-1">
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
                <Icon size={20} className="flex-shrink-0 md:mr-3" />

                <span
                  className={`
                    text-xs md:text-sm font-medium transition-all duration-300
                    ${expanded || forceExpanded || mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
                  `}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="relative flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg hover:shadow-lg hover:bg-red-600/30 transition-all duration-300 mt-auto"
          >
            <LogOut size={20} className="flex-shrink-0 md:mr-3" />
            <span
              className={`
                text-xs md:text-sm font-medium transition-all duration-300
                ${expanded || forceExpanded || mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
              `}
            >
              Logout
            </span>
          </button>
        </nav>

        {/* Mobile open button */}
        {!mobileOpen && (
          <button
            className="fixed bottom-4 left-4 md:hidden p-2 rounded-full bg-white/20 text-white shadow-md hover:bg-white/30 transition z-50"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;