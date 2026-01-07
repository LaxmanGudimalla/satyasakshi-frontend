import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiLogOut, FiBell } from "react-icons/fi";
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiTruck,
  FiFileText,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";

export default function SuperAdminShell() {
  const navigate = useNavigate();
  const location = useLocation();

const name  = localStorage.getItem("SUPER_ADMIN_name")  || "";
const email = localStorage.getItem("SUPER_ADMIN_email") || "";

  useEffect(() => {

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("SUPER_ADMIN_token");

  if (!token || role !== "SUPER_ADMIN") {
    // don’t restore wrong account
    navigate("/");
  }

}, []);
  // 🔹 Page title based on route
  const getPageTitle = () => {
    if (location.pathname.includes("admin-management"))
      return "Admin & User Management";
    if (location.pathname.includes("user-management"))
      return "User Management";
    if (location.pathname.includes("vehicle-verifications"))
      return "Vehicle Verifications";
    if (location.pathname.includes("verification-logs"))
      return "Verification Logs";
    if (location.pathname.includes("reports"))
      return "Reports & Analytics";
    if (location.pathname.includes("system-settings"))
      return "System Settings";

    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6 h-full">
        <div>
<div className="mb-6">
  <h2 className="text-xl font-bold text-blue-600 leading-tight">
    Vehicle Verification
  </h2>

  <p className="text-xs text-gray-400 mt-1">
    System
  </p>

  {/* Divider line */}
  <div className="mt-4 border-b border-gray-200"></div>
</div>

<nav className="space-y-4 text-gray-600">
  <SidebarItem
    icon={<FiGrid />}
    label="Dashboard"
    onClick={() => navigate("/super-admin")}
  />

  <SidebarItem
    icon={<FiUserCheck />}
    label="Admin Management"
    onClick={() => navigate("/super-admin/admin-management")}
  />

  <SidebarItem
    icon={<FiUsers />}
    label="User Management"
    onClick={() => navigate("/super-admin/user-management")}
  />

  <SidebarItem
    icon={<FiTruck />}
    label="Vehicle Verifications"
    onClick={() => navigate("/super-admin/vehicle-verifications")}
  />

  <SidebarItem
    icon={<FiFileText />}
    label="Verification Logs"
    onClick={() => navigate("/super-admin/verification-logs")}
  />

  <SidebarItem
    icon={<FiBarChart2 />}
    label="Reports & Analytics"
    onClick={() => navigate("/super-admin/reports")}
  />

  <SidebarItem
    icon={<FiSettings />}
    label="System Settings"
    onClick={() => navigate("/super-admin/system-settings")}
  />
</nav>

        </div>

        {/* BOTTOM PROFILE + LOGOUT */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Super Admin</p>
            <p className="text-sm text-gray-500 truncate w-40">
              {email}
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            title="Logout"
            className="text-gray-600 hover:text-red-600 text-xl"
          >
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        {/* 🔹 TOP HEADER */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">{getPageTitle()}</h1>

          <div className="flex items-center gap-4">
            <FiBell className="text-xl text-gray-500 cursor-pointer" />

            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {email ? email[0]?.toUpperCase() : "S"}
              </div>
              <div className="text-sm">
                <p className="font-semibold">{name}</p>
                <p className="text-gray-500 text-xs">{email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                 hover:bg-blue-50 hover:text-blue-600 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
