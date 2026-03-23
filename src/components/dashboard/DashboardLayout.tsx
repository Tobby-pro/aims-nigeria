// src/components/dashboard/DashboardLayout.tsx
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">

      {/* 🔥 Global Dashboard Glow — full screen, behind everything */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Top left */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-400/20 blur-[140px] rounded-full animate-blob"></div>
        {/* Top right */}
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] bg-indigo-600/25 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
        {/* Bottom left */}
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full animate-blob animation-delay-4000"></div>
        {/* Bottom right */}
        <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-orange-300/15 blur-[140px] rounded-full animate-blob animation-delay-6000"></div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className={`
            flex-1 bg-transparent min-h-screen
            p-4 sm:p-6
            md:pl-[var(--sidebar-width)] md:pt-0
            pt-20 md:pt-0
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;