// components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import HeaderInfo from "./HeaderInfo";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      {/* ---------------- Top Bar ---------------- */}
      <TopBar />

      {/* ---------------- Header Info ---------------- */}
      <HeaderInfo />

      {/* ---------------- Navbar (Fixed) ---------------- */}
      <Navbar />

      {/* ---------------- Main Content ---------------- */}
      <main className="pt-[144px]">
        {/* 
          padding-top = TopBar (40px) + HeaderInfo (40px) + Navbar (64px)
          ensures content is fully visible below fixed navbar
        */}
        <Outlet />
      </main>

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </>
  );
};

export default MainLayout;
