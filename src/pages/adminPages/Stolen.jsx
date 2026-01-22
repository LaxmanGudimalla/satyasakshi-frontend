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

  // ✅ NEW STATES
  const [commonSearch, setCommonSearch] = useState("");
  const [searchedFrom, setSearchedFrom] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSearch = async () => {
    setError("");
    setStolenData(null);
    setHasSearched(true);

    let searchParams = { ...form };
    let searchLabelText = "";

// if (commonSearch.trim()) {
//   searchParams = {
//     commonSearch: commonSearch.trim().toUpperCase()
//   };
// } else {
//   searchParams = { ...form }; // normal fields untouched
// }


 if (commonSearch.trim()) {
  const value = commonSearch.trim().toUpperCase();
  const len = value.length;

  searchParams = { commonSearch: value };

  if (/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(value)) {
    searchLabelText = "Registration Number";
  }
  else if (len === 5) {
    searchLabelText = "Engine / Chassis (Last 5 digits)";
  }
  else if (len === 6) {
    searchLabelText = "Engine / Chassis (Last 6 digits)";
  }
  else if (len === 10) {
    searchLabelText = "6 Digit Engine / Chassis & Reg No (Last 4 digits)";
  }
  else {
    searchLabelText = "Engine / Chassis Number";
  }
}




   // ✅ FIELD SEARCH FALLBACK (IMPORTANT)
if (!commonSearch.trim()) {
  if (form.registration_number) searchLabelText = "Registration Number";
  else if (form.chassis_number) searchLabelText = "Chassis Number";
  else if (form.engine_number) searchLabelText = "Engine Number";
  else if (form.chassis6_reg4) searchLabelText = "6 Digit Chassis & Reg";
  else if (form.engine6_reg4) searchLabelText = "6 Digit Engine & Reg";
  else if (form.engine_or_chassis_last5)
    searchLabelText = "Engine / Chassis (Last 5 digits)";
  else if (form.engine_or_chassis_last6)
    searchLabelText = "Engine / Chassis (Last 6 digits)";
}

  

    try {
      setLoading(true);

      const params = new URLSearchParams(
        Object.entries(searchParams).filter(([_, v]) => v)
      ).toString();

      setSearchedFrom(searchLabelText);

      const res = await getStolenVehicle(params);

      if (res.success && res.data) {
        setStolenData(Array.isArray(res.data) ? res.data[0] : res.data);

        addRecentActivity(
          "Stolen",
          commonSearch ||
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

         {/* COMMON SEARCH BAR */}
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder="Search using Registration / Chassis / Engine"
          className="border rounded-md px-4 py-2.5 text-sm w-full"
          value={commonSearch}
          onChange={(e) => setCommonSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-md px-6 py-2.5 text-sm flex items-center gap-2"
        >
          <FiSearch size={13} />
          Search
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      {/* DYNAMIC MESSAGE */}
     {hasSearched && stolenData && commonSearch.trim() && searchedFrom && (
  <p className="text-sm text-green-700 mt-4 font-medium">
    Below is the vehicle found from the <b>{searchedFrom}</b>
  </p>
)}
<br/>

        <div className="grid grid-cols-7 gap-4 items-end">
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

          {/* <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-md px-6 py-2.5 text-sm flex items-center justify-center gap-3"
          >
            <FiSearch size={13} />
            Search
          </button> */}
        </div>
      </div>

     

      {/* STOLEN DATA */}
      {hasSearched && (
        <div className="relative mt-6 min-h-[150px]">

          {loading && <SectionLoader />}

          {/* Placeholder while loading */}
          {loading && !stolenData && <ResultsPlaceholder />}
          
          {stolenData && (
            <>
          {/* MAIN DETAILS */}
          <div className="bg-white rounded-lg shadow mt-6 p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="p-3 text-left border-b">Make</th>
                  <th className="p-3 text-left border-b">Model</th>
                  <th className="p-3 text-left border-b">Color</th>
                  <th className="p-3 text-left border-b">FIR Number</th>
                  <th className="p-3 text-left border-b">Stolen Date</th>
                  <th className="p-3 text-left border-b">Police Station</th>
                </tr>
              </thead>
              <tbody>
                  <tr className="text-sm">
                    <td className="p-3">{stolenData.vehicle_make || "Not Available"}</td>
                    <td className="p-3">{stolenData.vehicle_model || "Not Available"}</td>
                    <td className="p-3">{stolenData.vehicle_color || "Not Available"}</td>
                    <td className="p-3">{stolenData.fir_number || "Not Available"}</td>
                    <td className="p-3">
                      {stolenData.stolen_date
                        ? new Date(stolenData.stolen_date).toLocaleDateString("en-GB")
                        : "Not Available"}
                    </td>
                    <td className="p-3">{stolenData.police_station || "Not Available"}</td>
                  </tr>
              </tbody>
            </table>
          </div>

          {/* EXTRA DETAILS */}
          <div className="bg-white rounded-lg shadow mt-4 p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="p-3 text-left border-b">Complainant</th>
                  <th className="p-3 text-left border-b">State</th>
                  <th className="p-3 text-left border-b">District</th>
                  <th className="p-3 text-left border-b">Vehicle Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <td className="p-3">{stolenData.complainant || "Not Available"}</td>
                  <td className="p-3">{stolenData.state || "Not Available"}</td>
                  <td className="p-3">{stolenData.district || "Not Available"}</td>
                  <td className="p-3">{stolenData.vehicle_type || "Not Available"}</td>
                </tr>
              </tbody>
            </table>
          </div>
         </>
          )}

        </div>
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

function SectionLoader() {
  return (
    <div className="absolute inset-0 bg-blue-100/80 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-700 font-medium">
          Searching Stolen Vehicle Records…
        </p>
      </div>
    </div>
  );
}

function ResultsPlaceholder() {
  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[260px]" />
  );
}
