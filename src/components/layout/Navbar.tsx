// components/layout/Navbar.tsx

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiChevronDown, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../Container";

/* -------------------- utils -------------------- */
const useIsTouch = () => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
};

/* Desktop active link helper */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-indigo-600 font-semibold"
    : "hover:text-gray-900 transition";

/* Mobile active link helper */
const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block w-full text-sm ${
    isActive ? "text-indigo-600 font-semibold" : "hover:text-gray-900 transition"
  }`;

/* -------------------- component -------------------- */
const Navbar = () => {
  const isTouch = useIsTouch();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false); // mobile auth dropdown

  const dropdownRef = useRef<HTMLLIElement | null>(null);

  /* ---- active parent detection ---- */
  const isAboutActive =
    location.pathname.startsWith("/about") ||
    location.pathname.startsWith("/activities") ||
    location.pathname.startsWith("/leadership"); 

  const isMembershipActive = location.pathname.startsWith("/membership");

  /* ---- close dropdown on outside tap (mobile) ---- */
  useEffect(() => {
    if (!isTouch) return;
    const handleOutside = (e: TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("touchstart", handleOutside);
    return () => document.removeEventListener("touchstart", handleOutside);
  }, [isTouch]);

  const openDropdown = (name: string) => {
    if (!isTouch) setActiveDropdown(name);
  };

  const closeDropdown = () => {
    if (!isTouch) setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    if (isTouch) setActiveDropdown(prev => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setAuthOpen(false);
  };

  /* ------------------ KEEP YOUR OFFSET ------------------ */
  const NAVBAR_TOP_OFFSET = 80; // 40 + 40 px total

  return (
    <header
      className="fixed left-0 w-full z-50 shadow-md bg-white/80 backdrop-blur-md"
      style={{ top: NAVBAR_TOP_OFFSET }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo.png" alt="AIMS Nigeria Logo" className="h-12" />
          </Link>

          {/* ---------------- Desktop Nav ---------------- */}
          <ul className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <li>
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </li>

            {/* About */}
            <li ref={dropdownRef} className="relative" onMouseEnter={() => openDropdown("about")} onMouseLeave={closeDropdown}>
              <button
                onClick={() => toggleDropdown("about")}
                className={`flex items-center gap-1 transition ${
                  isAboutActive ? "text-indigo-600 font-semibold" : "hover:text-gray-900"
                }`}
              >
                About <FiChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === "about" && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-20"
                  >
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/about" className={navLinkClass}>About AIMS</NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/activities" className={navLinkClass}>Activities</NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/leadership" className={navLinkClass}>Leadership & Governance</NavLink>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Membership */}
            <li className="relative" onMouseEnter={() => openDropdown("membership")} onMouseLeave={closeDropdown}>
              <button
                onClick={() => toggleDropdown("membership")}
                className={`flex items-center gap-1 transition ${
                  isMembershipActive ? "text-indigo-600 font-semibold" : "hover:text-gray-900"
                }`}
              >
                Membership <FiChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === "membership" && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg rounded-md z-20"
                  >
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/membership/categories" className={navLinkClass}>Categories</NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/membership/benefits" className={navLinkClass}>Benefits</NavLink>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li><NavLink to="/training" className={navLinkClass}>Training</NavLink></li>
            <li><NavLink to="/publications" className={navLinkClass}>Publications</NavLink></li>

            {/* Desktop Auth */}
            <li className="flex items-center gap-3 ml-4">
              <Link to="/login" className="flex items-center gap-1 text-sm hover:text-gray-900">
                <FiLogIn /> Member Login
              </Link>
              <Link to="/signup" className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
                <FiUserPlus /> Become a Member
              </Link>
            </li>
          </ul>

          {/* ---------------- Mobile Toggle ---------------- */}
          <div className="flex md:hidden items-center gap-3">
            <div className="relative">
              <button onClick={() => setAuthOpen(prev => !prev)} className="text-gray-700 text-xl">
                <FiUser />
              </button>
              <AnimatePresence>
                {authOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md z-30 p-2 space-y-1 text-sm"
                  >
                    <NavLink to="/login" onClick={closeMobileMenu} className="block hover:text-indigo-600">
                      Member Login
                    </NavLink>
                    <NavLink to="/signup" onClick={closeMobileMenu} className="block hover:text-indigo-600">
                      Become a Member
                    </NavLink>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setMobileOpen(prev => !prev)} className="text-gray-700 text-xl">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* ---------------- Mobile Menu ---------------- */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-4 bg-white shadow rounded-md space-y-3"
            >
              <NavLink to="/" onClick={closeMobileMenu} className={mobileNavLinkClass}>Home</NavLink>
              <NavLink to="/about" onClick={closeMobileMenu} className={mobileNavLinkClass}>About AIMS</NavLink>
              <NavLink to="/activities" onClick={closeMobileMenu} className={mobileNavLinkClass}>Activities</NavLink>
              <NavLink to="/leadership" onClick={closeMobileMenu} className={mobileNavLinkClass}>Leadership & Governance</NavLink>
              <NavLink to="/membership/categories" onClick={closeMobileMenu} className={mobileNavLinkClass}>Membership Categories</NavLink>
              <NavLink to="/membership/benefits" onClick={closeMobileMenu} className={mobileNavLinkClass}>Membership Benefits</NavLink>
              <NavLink to="/training" onClick={closeMobileMenu} className={mobileNavLinkClass}>Training</NavLink>
              <NavLink to="/publications" onClick={closeMobileMenu} className={mobileNavLinkClass}>Publications</NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Navbar;
