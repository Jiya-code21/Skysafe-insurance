import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { AppProvider } from "../src/context/AppContext";
import { ThemeProvider } from "../src/context/ThemeContext";

// Layout & Guards
import Layout from "../src/components/Layout";
import ProtectedRoute from "../src/components/ProtectedRoute";
import AdminRoute from "../src/components/AdminRoute";
import AdminLayout from "../src/components/AdminLayout";

// Auth Pages
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import ForgotPassword from "../src/pages/forgotPassword";
import Onboarding from "../src/pages/Onboarding";
import VerifyOtp from "../src/pages/VerifyOtp";

// User Pages
import Dashboard from "../src/pages/Dashboard";
import Claims from "../src/pages/Claims";
import Analytics from "../src/pages/Analytics";
import Settings from "../src/pages/Settings";
import MyPolicies from "../src/pages/MyPolicies";
import BuyPolicy from "../src/pages/BuyPolicy";
import PricingCalculator from "../src/pages/PricingCalculator";

// Admin Pages
import AdminDashboard from "../src/pages/AdminDashboard";
import AdminClaims from "../src/pages/AdminClaims";
import AdminUsers from "../src/pages/AdminUsers";
import AdminPolicies from "../src/pages/AdminPolicies";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />

              {/* User Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/claims" element={<Claims />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/policy" element={<MyPolicies />} />
                  <Route path="/policy/buy" element={<BuyPolicy />} />
                  <Route path="/pricing" element={<PricingCalculator />} />
                </Route>
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/claims" element={<AdminClaims />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/policies" element={<AdminPolicies />} />
                </Route>
              </Route>

              {/* Fallback — role ke according redirect */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;