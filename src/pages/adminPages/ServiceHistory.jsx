import { useState } from "react";
import { searchVehicleServiceHistory } from "../../services/admin.service";
import { FiUpload } from "react-icons/fi";


export default function ServiceHistory() {
<<<<<<< HEAD
  const [form, setForm] = useState({
    registration_number: "",
    chassis_number: "",
    engine_number: ""
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setError("");
    setData([]);

    if (
      !form.registration_number &&
      !form.chassis_number &&
      !form.engine_number
    ) {
      setError("Enter Registration OR Chassis OR Engine Number");
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams(form).toString();
      const result = await searchVehicleServiceHistory(params);

      if (result.success) {
        setData(Array.isArray(result.data) ? result.data : [result.data]);
      } else {
        setError(result.message || "Vehicle not found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* PAGE TITLE */}
      <div className="flex justify-between items-start mb-4">
  <div>
    <h2 className="text-xl font-semibold">Service History</h2>
    <p className="text-sm text-gray-500 mt-1">
      Search for vehicle details using registration, chassis and engine number
    </p>
  </div>
<button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2">
  <FiUpload className="text-gray-600" size={16} />
  Bulk Upload
</button>

</div>

      {/* 🔍 SEARCH CRITERIA CARD */}
      <div className="bg-white rounded-lg shadow mb-6 p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Search Criteria
        </p>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="registration_number"
            placeholder="Registration Number"
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="chassis_number"
            placeholder="Chassis Number"
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="engine_number"
            placeholder="Engine Number"
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-md px-6 py-2 text-sm flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 📊 TABLE CARD */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="p-3 border">Sr No</th>
              <th className="p-3 border">Registration Number</th>
              <th className="p-3 border">Chassis Number</th>
              <th className="p-3 border">Engine Number</th>
              <th className="p-3 border">Make</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Registration Year</th>
              <th className="p-3 border">Color</th>
              <th className="p-3 border">Service Centre Name</th>
              <th className="p-3 border">Last Service Date</th>
              <th className="p-3 border">Amount</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan="11" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{row.registration_number}</td>
                  <td className="p-3 border">{row.chassis_number}</td>
                  <td className="p-3 border">{row.engine_number}</td>
                  <td className="p-3 border">{row.make}</td>
                  <td className="p-3 border">{row.model}</td>
                  <td className="p-3 border">{row.registration_year}</td>
                  <td className="p-3 border">{row.colour || "-"}</td>
                  <td className="p-3 border">
                    {row.service_center_name || "-"}
                  </td>
                  <td className="p-3 border">
                    {row.last_service_date
                      ? new Date(row.last_service_date).toLocaleDateString(
                          "en-GB"
                        )
                      : "-"}
                  </td>
                  <td className="p-3 border font-medium">
                    ₹ {row.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="p-6 text-center text-sm text-gray-500"
                >
                  No records found. Please search using Registration / Chassis /
                  Engine Number.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
=======
  return (
    <h1 className="text-3xl font-bold text-center mt-40">
      Service History
    </h1>
>>>>>>> 6049493a8f7fee8c2d28082ac628613289ecb271
  );
}
