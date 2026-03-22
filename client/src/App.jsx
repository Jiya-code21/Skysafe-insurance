// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// // Layout & Guards
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Auth Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import forgotPassword from "./pages/forgotPassword";

// // App Pages
// import Dashboard from "./pages/Dashboard";
// import Claims from "./pages/Claims";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>

//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<forgotPassword />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/claims" element={<Claims />} />
//             </Route>
//           </Route>

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

// Layout & Guards
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgotPassword";
import Onboarding from "./pages/Onboarding";

// App Pages
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import MyPolicies from "./pages/MyPolicies";
import BuyPolicy from "./pages/BuyPolicy";
import PricingCalculator from "./pages/PricingCalculator";

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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Protected Routes */}
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

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
