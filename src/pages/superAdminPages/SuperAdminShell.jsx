import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiBell } from "react-icons/fi";

export default function SuperAdminShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";

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
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-bold mb-8">Vehicle Verify</h2>

          <nav className="space-y-4 text-gray-600">
            <p onClick={() => navigate("/super-admin")} className="cursor-pointer hover:text-blue-600">
              Dashboard
            </p>

            <p
              onClick={() => navigate("/super-admin/admin-management")}
              className="cursor-pointer hover:text-blue-600"
            >
              Admin Management
            </p>

            <p
              onClick={() => navigate("/super-admin/user-management")}
              className="cursor-pointer hover:text-blue-600"
            >
              User Management
            </p>

            <p
              onClick={() => navigate("/super-admin/vehicle-verifications")}
              className="cursor-pointer hover:text-blue-600"
            >
              Vehicle Verifications
            </p>

            <p
              onClick={() => navigate("/super-admin/verification-logs")}
              className="cursor-pointer hover:text-blue-600"
            >
              Verification Logs
            </p>

            <p
              onClick={() => navigate("/super-admin/reports")}
              className="cursor-pointer hover:text-blue-600"
            >
              Reports & Analytics
            </p>

            <p
              onClick={() => navigate("/super-admin/system-settings")}
              className="cursor-pointer hover:text-blue-600"
            >
              System Settings
            </p>
          </nav>
        </div>

        {/* BOTTOM PROFILE + LOGOUT */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{name || "Super Admin"}</p>
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
