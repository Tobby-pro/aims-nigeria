// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import Publications from "./pages/Publications";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Leadership from "./pages/Leadership";

import MembershipCategories from "./pages/membership/Categories";
import MembershipBenefits from "./pages/membership/Benefits";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/training" element={<Training />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leadership" element={<Leadership />} />

        <Route
          path="/membership/categories"
          element={<MembershipCategories />}
        />

        <Route
          path="/membership/benefits"
          element={<MembershipBenefits />}
        />
      </Route>

      {/* ✅ Protected Dashboard (FIXED HERE) */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;