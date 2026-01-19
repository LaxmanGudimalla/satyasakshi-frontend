import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiLogOut, FiBell } from "react-icons/fi";
import {
  FiGrid,
  FiRefreshCcw,
  FiAlertCircle,
  FiClock,
  FiCopy,
  FiFileText,
  FiRotateCcw,
  FiCreditCard,
  FiShield
} from "react-icons/fi";



export default function AdminShell() {

  const navigate = useNavigate();
  const location = useLocation();

const name  = localStorage.getItem("ADMIN_name")  || "Admin";
const email = localStorage.getItem("ADMIN_email") || "admin@system.com";

  useEffect(() => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ADMIN_token");

  if (!token || role !== "ADMIN") {
    navigate("/");
  }

}, []);
  // 🔹 Page title based on route
  const getPageTitle = () => {
    if (location.pathname.includes("re-registration"))
      return "Re-Registration";
    if (location.pathname.includes("challan-check"))
      return "Challan Check";
    if (location.pathname.includes("service-history"))
      return "Service History";
    if (location.pathname.includes("cloned-vehicle"))
      return "Cloned Vehicle";
    if (location.pathname.includes("claim-history"))
      return "Claim History";
    if (location.pathname.includes("recovery"))
      return "Recovery";
    if (location.pathname.includes("fastag"))
      return "FASTag";
    if (location.pathname.includes("insurance-status"))
      return "Insurance Status";
    if (location.pathname.includes("stolen"))
      return "Stolen";


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


<nav className="space-y-4 text-gray-700">
  <SidebarItem
    icon={<FiGrid />}
    label="Dashboard"
    active={location.pathname === "/admin"}
    onClick={() => navigate("/admin")}
  />

  <SidebarItem
    icon={<FiRefreshCcw />}
    label="Re-Registration"
    active={location.pathname.includes("re-registration")}
    onClick={() => navigate("/admin/re-registration")}
  />

  <SidebarItem
    icon={<FiAlertCircle />}
    label="Challan Check"
    active={location.pathname.includes("challan-check")}
    onClick={() => navigate("/admin/challan-check")}
  />

  <SidebarItem
    icon={<FiClock />}
    label="Service History"
    active={location.pathname.includes("service-history")}
    onClick={() => navigate("/admin/service-history")}
  />

  <SidebarItem
    icon={<FiCopy />}
    label="Cloned Vehicle"
    active={location.pathname.includes("cloned-vehicle")}
    onClick={() => navigate("/admin/cloned-vehicle")}
  />

  <SidebarItem
    icon={<FiFileText />}
    label="Claim History"
    active={location.pathname.includes("claim-history")}
    onClick={() => navigate("/admin/claim-history")}
  />

  <SidebarItem
    icon={<FiRotateCcw />}
    label="Recovery"
    active={location.pathname.includes("recovery")}
    onClick={() => navigate("/admin/recovery")}
  />

  <SidebarItem
    icon={<FiCreditCard />}
    label="FASTag"
    active={location.pathname.includes("fastag")}
    onClick={() => navigate("/admin/fastag")}
  />

  <SidebarItem
    icon={<FiShield />}
    label="Insurance Status"
    active={location.pathname.includes("insurance-status")}
    onClick={() => navigate("/admin/insurance-status")}
  />

  <SidebarItem
  icon={<FiAlertCircle />}
  label="Stolen"
  active={location.pathname.includes("stolen")}
  onClick={() => navigate("/admin/stolen")}
/>


</nav>

        </div>

        {/* BOTTOM PROFILE + LOGOUT */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-gray-500 truncate w-40">
              {email}
            </p>
          </div>

          <button
            onClick={() => {
              // localStorage.clear();
              localStorage.removeItem("ADMIN_token");
              localStorage.removeItem("name");
              localStorage.removeItem("email");
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
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">{getPageTitle()}</h1>

          <div className="flex items-center gap-4">
            <FiBell className="text-xl text-gray-500 cursor-pointer" />

            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {email[0]?.toUpperCase()}
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

function SidebarItem({ icon, label, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${
          active
            ? "bg-blue-50 text-blue-600 font-semibold"
            : "hover:bg-gray-100 hover:text-blue-600"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
