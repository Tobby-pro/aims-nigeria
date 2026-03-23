// src/components/dashboard/Sidebar.tsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  { icon: BookOpen, label: "Training", path: "/dashboard/training" },
  { icon: GraduationCap, label: "Courses", path: "/dashboard/courses" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const width = expanded ? "14rem" : "5rem";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [expanded]);

  return (
    <>
      {/* --- MOBILE TOP NAVIGATION --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-violet-950 border-b border-white/10 flex items-center justify-between px-4 z-50 shadow-lg">
        <span className="font-semibold text-sm text-white tracking-tight">
          AIMS Nigeria
        </span>

        <button
          onClick={handleLogout}
          className="p-2 text-white/70 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <span className="text-[11px] font-medium lowercase">exit</span>
          <LogOut size={16} />
        </button>
      </div>

      {/* --- MOBILE BOTTOM TAB BAR --- */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl flex items-center justify-around z-50 px-2 shadow-2xl">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={i}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 ${
                isActive
                  ? "text-indigo-600 scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />

              <span className="text-[9px] font-medium mt-1 tracking-normal">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={`
          hidden md:flex fixed top-0 left-0 z-40 h-screen flex-col
          bg-gradient-to-b from-violet-950 via-indigo-900 to-violet-800
          text-white shadow-2xl transition-all duration-300 ease-in-out
          ${expanded ? "w-56" : "w-20"}
        `}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 border-b border-white/10 overflow-hidden">
          <div className="min-w-[32px] h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 shadow-inner">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span
            className={`font-bold whitespace-nowrap transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            AIMS Nigeria
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="flex-1 py-6 px-3 space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center h-12 rounded-xl transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-white text-indigo-900 shadow-xl"
                      : "hover:bg-white/10 text-white/70 hover:text-white"
                  }`
                }
              >
                <div className="min-w-[56px] flex justify-center">
                  <Icon size={22} />
                </div>

                <span
                  className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>

                {isActive && !expanded && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                )}

                {!expanded && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full h-12 rounded-xl text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group relative"
          >
            <div className="min-w-[56px] flex justify-center">
              <LogOut size={22} />
            </div>
            <span
              className={`text-sm font-semibold transition-all duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* CONTENT SPACER */}
      <div className="md:hidden h-16" />
      <div className="md:hidden h-24" />
    </>
  );
};

export default Sidebar;