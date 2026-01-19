import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getStolenVehicle } from "../../services/admin.service";
import { addRecentActivity } from "../../helpers/recentActivity.helper";

export default function Stolen() {
  const [form, setForm] = useState({
    registration_number: "",
    chassis_number: "",
    engine_number: "",
    chassis6_reg4: "",
    engine6_reg4: "",
    engine_or_chassis_last5: "",
    engine_or_chassis_last6: ""
  });

  const [stolenData, setStolenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setError("");
    setStolenData(null);

    try {
      setLoading(true);
      setHasSearched(true);

      const params = new URLSearchParams(
        Object.entries(form).filter(([_, v]) => v)
      ).toString();

      const res = await getStolenVehicle(params);

      if (res.success && res.data) {
        setStolenData(Array.isArray(res.data) ? res.data[0] : res.data);

        addRecentActivity(
          "Stolen",
          form.registration_number ||
          form.chassis_number ||
          form.engine_number ||
          form.chassis6_reg4 ||
          form.engine6_reg4 ||
          form.engine_or_chassis_last5 ||
          form.engine_or_chassis_last6
        );
      } else {
        setError("No stolen vehicle records found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch stolen vehicle data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Stolen</h2>
        <p className="text-sm text-gray-500 mt-1">
          Search for stolen vehicle details using registration, chassis and engine number
        </p>
      </div>

      {/* SEARCH CRITERIA */}
      <div className="bg-white rounded-lg shadow p-5">
        <p className="text-sm font-semibold text-gray-900 mb-4">
          Search Criteria
        </p>

        <div className="grid grid-cols-8 gap-4 items-end">

          <Input label="Registration Number" name="registration_number" onChange={handleChange} />
          <Input label="Chassis Number" name="chassis_number" onChange={handleChange} />
          <Input label="Engine Number" name="engine_number" onChange={handleChange} />

          <Input
            label="6 Digit Chassis & Reg No (Last 4 digits)"
            name="chassis6_reg4"
            onChange={handleChange}
          />

          <Input
            label="6 Digit Engine & Reg No (Last 4 digits)"
            name="engine6_reg4"
            onChange={handleChange}
          />

          <Input
            label="Engine Chassis (Last 5 digit combination)"
            name="engine_or_chassis_last5"
            onChange={handleChange}
          />

          <Input
            label="Engine Chassis (Last 6 digit Combination)"
            name="engine_or_chassis_last6"
            onChange={handleChange}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-md px-6 py-2.5 text-sm flex items-center justify-center gap-3"
          >
            <FiSearch size={13} />
            Search
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-sm text-red-500 mt-4">{error}</p>
      )}

      {/* STOLEN DATA */}
      {hasSearched && stolenData && (
        <>
          {/* MAIN DETAILS */}
          <div className="bg-white rounded-lg shadow mt-6 p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="p-3 text-left border-b">Make</th>
                  <th className="p-3 text-left border-b">Model</th>
                  <th className="p-3 text-left border-b">Year</th>
                  <th className="p-3 text-left border-b">FIR Number</th>
                  <th className="p-3 text-left border-b">Stolen Date</th>
                  <th className="p-3 text-left border-b">Police Station</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-sm text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  <tr className="text-sm">
                    <td className="p-3">{stolenData.make}</td>
                    <td className="p-3">{stolenData.model}</td>
                    <td className="p-3">{stolenData.manufacturing_year}</td>
                    <td className="p-3">{stolenData.fir_number}</td>
                    <td className="p-3">{stolenData.stolen_date}</td>
                    <td className="p-3">{stolenData.police_station}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* EXTRA DETAILS */}
          <div className="bg-white rounded-lg shadow mt-4 p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="p-3 text-left border-b">DD No</th>
                  <th className="p-3 text-left border-b">State</th>
                  <th className="p-3 text-left border-b">District</th>
                  <th className="p-3 text-left border-b">Vehicle Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <td className="p-3">{stolenData.dd_no}</td>
                  <td className="p-3">{stolenData.state}</td>
                  <td className="p-3">{stolenData.districts}</td>
                  <td className="p-3">{stolenData.vehicle_type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* Reusable Input */
function Input({ label, name, onChange }) {
  return (
    <div>
      <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="border rounded-md px-3 py-2 text-sm w-full"
        onChange={onChange}
      />
    </div>
  );
}
