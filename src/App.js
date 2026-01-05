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
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import FieldExecutiveDashboard from "./pages/dashboards/FieldExecutiveDashboard";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";


import AdminShell from "./pages/adminPages/AdminShell";
import ReRegistration from "./pages/adminPages/ReRegistration";
import ChallanCheck from "./pages/adminPages/ChallanCheck";
import ServiceHistory from "./pages/adminPages/ServiceHistory";
import ClonedVehicle from "./pages/adminPages/ClonedVehicle";
import ClaimHistory from "./pages/adminPages/ClaimHistory";
import Recovery from "./pages/adminPages/Recovery";
import Fastag from "./pages/adminPages/Fastag";
import InsuranceStatus from "./pages/adminPages/InsuranceStatus";



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

   
      <Route path="/admin" element={<AdminShell />}>
  <Route index element={<AdminDashboard />} />
   <Route path="admindashboard" element={<AdminDashboard />} /> 
  <Route path="re-registration" element={<ReRegistration />} />
  <Route path="challan-check" element={<ChallanCheck />} />
  <Route path="service-history" element={<ServiceHistory />} />
  <Route path="cloned-vehicle" element={<ClonedVehicle />} />
  <Route path="claim-history" element={<ClaimHistory />} />
  <Route path="recovery" element={<Recovery />} />
  <Route path="fastag" element={<Fastag />} />
  <Route path="insurance-status" element={<InsuranceStatus />} />
</Route>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
