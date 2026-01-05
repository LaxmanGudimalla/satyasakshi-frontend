import { useNavigate } from "react-router-dom";
import RecoverVehicle from "../../components/RecoverVehicle";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 via-green-800 to-yellow-200 flex flex-col items-center py-8">

      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 px-4">
        <h1 className="text-2xl font-bold text-white">
          Customer Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Recover Vehicle Card */}
      <RecoverVehicle />

    </div>
  );
}
