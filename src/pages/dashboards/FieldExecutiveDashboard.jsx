import { useNavigate } from "react-router-dom";

export default function FieldExecutiveDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Executive Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p>Field Executive role recognized</p>
    </div>
  );
}
