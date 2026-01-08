import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getRecoveredVehicle } from "../../services/admin.service";
import { addRecentActivity } from "../../helpers/recentActivity.helper";

export default function Recovery() {
  const [form, setForm] = useState({
    registration_number: "",
    chassis_number: "",
    engine_number: "",
    chassis6_reg4: "",
    engine6_reg4: "",
    engine_or_chassis_last5: "",
    engine_or_chassis_last6: ""
  });

  const [recoveryData, setRecoveryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setError("");
    setRecoveryData(null);

    try {
      setLoading(true);
      setHasSearched(true);

    const params = new URLSearchParams(
  Object.entries(form).filter(([_, v]) => v)
).toString();

      const res = await getRecoveredVehicle(params);

      if (res.success && res.data) {
        // handle object OR array response safely
        setRecoveryData(Array.isArray(res.data) ? res.data[0] : res.data);

        addRecentActivity(
    "Recovery",
    form.registration_number ||
    form.chassis_number ||
    form.engine_number ||
    form.chassis6_reg4 ||
    form.engine6_reg4 ||
    form.engine_or_chassis_last5 ||
    form.engine_or_chassis_last6
  );
      } else {
        setError("No recovery records found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch recovery data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Recovery</h2>
        <p className="text-sm text-gray-500 mt-1">
          Search for vehicle details using registration, chassis and engine number
        </p>
      </div>

      {/* SEARCH CRITERIA CARD */}
      <div className="bg-white rounded-lg shadow p-5">
        <p className="text-sm font-semibold text-gray-900 mb-4">
          Search Criteria
        </p>

        <div className="grid grid-cols-8 gap-4 items-end">
          {/* Registration */}
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              Registration Number
            </label>
            <input
              type="text"
              name="registration_number"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

          {/* Chassis */}
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              Chassis Number
            </label>
            <input
              type="text"
              name="chassis_number"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

          {/* Engine */}
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              Engine Number
            </label>
            <input
              type="text"
              name="engine_number"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

        
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              6 Digit Chassis & Reg No (Last 4 digits)
            </label>
            <input
              type="text"
              name="chassis6_reg4"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

         
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              6 Digit Engine & Reg No (Last 4 digits)
            </label>
            <input
              type="text"
              name="engine6_reg4"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

          {/* Engine Chassis 5 */}
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              Engine Chassis (Last 5 digit combination)
            </label>
            <input
              type="text"
              name="engine_or_chassis_last5"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>

          {/* Engine Chassis 6 */}
          <div>
            <label className="text-[11px] text-gray-700 mb-1 block leading-snug">
              Engine Chassis (Last 6 digit Combination)
            </label>
            <input
              type="text"
              name="engine_or_chassis_last6"
              className="border rounded-md px-3 py-2 text-sm w-full"
              onChange={handleChange}
            />
          </div>
          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white rounded-md px-6 py-2.5 text-sm flex items-center justify-center gap-3"
            >
              <FiSearch size={13} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-sm text-red-500 mt-4">{error}</p>
      )}

{hasSearched && recoveryData && (
  <>
      {/* RECOVERY DETAILS TABLE */}
      <div className="bg-white rounded-lg shadow mt-6 p-4">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-xs text-gray-900 uppercase">
            <tr>
              <th className="p-3 text-left border-b">Make</th>
              <th className="p-3 text-left border-b">Model</th>
              <th className="p-3 text-left border-b">Year</th>
              <th className="p-3 text-left border-b">Recovery PS</th>
              <th className="p-3 text-left border-b">FIR Number</th>
              <th className="p-3 text-left border-b">Seizure Date</th>
              <th className="p-3 text-left border-b">Police Station</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : recoveryData ? (
              <tr className="text-sm">
                <td className="p-3">{recoveryData.make}</td>
                <td className="p-3">{recoveryData.model}</td>
                <td className="p-3">{recoveryData.manufacturing_year}</td>
                <td className="p-3">{recoveryData.recovery_location}</td>
                <td className="p-3">{recoveryData.fir_number}</td>
                <td className="p-3">{recoveryData.recovery_date}</td>
                <td className="p-3">{recoveryData.police_station}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-sm text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADDITIONAL VEHICLE DETAILS TABLE */}
      <div className="bg-white rounded-lg shadow mt-4 p-4">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-xs text-gray-900 uppercase">
            <tr>
              <th className="p-3 text-left border-b">DD No</th>
              <th className="p-3 text-left border-b">State</th>
              <th className="p-3 text-left border-b">District</th>
              <th className="p-3 text-left border-b">Vehicle Type</th>
            </tr>
          </thead>
          <tbody>
            {recoveryData ? (
              <tr className="text-sm">
                <td className="p-3">{recoveryData.dd_no}</td>
                <td className="p-3">{recoveryData.state}</td>
                <td className="p-3">{recoveryData.districts}</td>
                <td className="p-3">{recoveryData.vehicle_type}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-sm text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
)}
    </div>
  );
}
