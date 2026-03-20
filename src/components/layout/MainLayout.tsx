// src/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import HeaderInfo from "./HeaderInfo";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      
      {/* 🔥 Global Top/Bottom Glow Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Top left glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-700/20 blur-[140px] rounded-full animate-blob"></div>
        {/* Top right glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/25 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
        {/* Bottom left glow */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full animate-blob animation-delay-4000"></div>
        {/* Bottom right glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full animate-blob animation-delay-6000"></div>
      </div>

      {/* ---------------- Top Bar ---------------- */}
      <TopBar />

      {/* ---------------- Header Info ---------------- */}
      <HeaderInfo />

      {/* ---------------- Navbar (Fixed) ---------------- */}
      <Navbar />

      {/* 🔑 GLOBAL SCROLL RESET ON ROUTE CHANGE */}
      <ScrollToTop />

      {/* ---------------- Main Content ---------------- */}
      <main className="pt-[144px]">
        {/*
          padding-top = TopBar (40px)
                       + HeaderInfo (40px)
                       + Navbar (64px)
          ensures content is fully visible below fixed navbar
        */}
        <Outlet />
      </main>

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </div>
  );
};

export default MainLayout;