import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiBell } from "react-icons/fi";

export default function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = localStorage.getItem("name") || "Admin";
  const email = localStorage.getItem("email") || "admin@system.com";

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

    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-bold mb-8">
            Vehicle Verification
          </h2>

          <nav className="space-y-4 text-gray-600">
            <p
              onClick={() => navigate("/admin")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </p>

            <p
              onClick={() => navigate("/admin/re-registration")}
              className="cursor-pointer hover:text-blue-600"
            >
              Re-Registration
            </p>

            <p
              onClick={() => navigate("/admin/challan-check")}
              className="cursor-pointer hover:text-blue-600"
            >
              Challan Check
            </p>

            <p
              onClick={() => navigate("/admin/service-history")}
              className="cursor-pointer hover:text-blue-600"
            >
              Service History
            </p>

            <p
              onClick={() => navigate("/admin/cloned-vehicle")}
              className="cursor-pointer hover:text-blue-600"
            >
              Cloned Vehicle
            </p>

            <p
              onClick={() => navigate("/admin/claim-history")}
              className="cursor-pointer hover:text-blue-600"
            >
              Claim History
            </p>

            <p
              onClick={() => navigate("/admin/recovery")}
              className="cursor-pointer hover:text-blue-600"
            >
              Recovery
            </p>

            <p
              onClick={() => navigate("/admin/fastag")}
              className="cursor-pointer hover:text-blue-600"
            >
              FASTag
            </p>

            <p
              onClick={() => navigate("/admin/insurance-status")}
              className="cursor-pointer hover:text-blue-600"
            >
              Insurance Status
            </p>
          </nav>
        </div>

        {/* BOTTOM PROFILE + LOGOUT */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{name}</p>
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
