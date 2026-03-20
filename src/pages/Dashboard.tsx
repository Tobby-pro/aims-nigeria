// src/pages/Dashboard.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHome from "../components/dashboard/DashboardHome";
import TrainingPrograms from "../components/dashboard/TrainingPrograms";
import MyCourses from "../components/dashboard/MyCourses";
import Certificates from "../components/dashboard/Certificates";

// (Optional placeholder for now)
const Profile = () => {
  return <div className="text-gray-700">Profile Page Coming Soon</div>;
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* Default dashboard home */}
        <Route path="/" element={<DashboardHome />} />

        {/* Dashboard Pages */}
        <Route path="profile" element={<Profile />} />
        <Route path="training" element={<TrainingPrograms />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="certificates" element={<Certificates />} />

        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;