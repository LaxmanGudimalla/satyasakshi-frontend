import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* SUPER ADMIN */
import SuperAdminShell from "./pages/superAdminPages/SuperAdminShell";
import AdminManagement from "./pages/superAdminPages/AdminManagement";

/* SUPER ADMIN SUB PAGES */
import SuperAdminDashboard from "./pages/superAdminPages/SuperAdminDashboard";
import UserManagement from "./pages/superAdminPages/UserManagement";
import VehicleVerifications from "./pages/superAdminPages/VehicleVerifications";
import VerificationLogs from "./pages/superAdminPages/VerificationLogs";
import Reports from "./pages/superAdminPages/Reports";
import SystemSettings from "./pages/superAdminPages/SystemSettings";

/* OTHER ROLES */
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import FieldExecutiveDashboard from "./pages/dashboards/FieldExecutiveDashboard";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* SUPER ADMIN (WITH RIGHT-SIDE NAVIGATION) */}
        <Route path="/super-admin" element={<SuperAdminShell />}>
          {/* Default → Admin Management */}
          <Route index element={<SuperAdminDashboard />} />

          <Route path="superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="admin-management" element={<AdminManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="vehicle-verifications" element={<VehicleVerifications />} />
          <Route path="verification-logs" element={<VerificationLogs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="system-settings" element={<SystemSettings />} />
        </Route>

        {/* OTHER DASHBOARDS */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/field" element={<FieldExecutiveDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
