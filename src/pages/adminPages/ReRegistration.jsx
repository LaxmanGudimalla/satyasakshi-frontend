import { useState } from "react";
import { searchReRegistration } from "../../services/admin.service";
import { FiSearch, FiUpload } from "react-icons/fi";
import { addRecentActivity } from "../../helpers/recentActivity.helper";

export default function ReRegistration() {
  const [form, setForm] = useState({
    registrationNumber: "",
    chassisNumber: "",
    engineNumber: "",
    mobileNumber: ""
  });

  const [result, setResult] = useState(null);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    if (!form.registrationNumber && !form.chassisNumber && !form.engineNumber) {
      alert("Enter at least one search field");
      return;
    }

    try {
      setLoading(true);
      const res = await searchReRegistration(form);
      setResult(res);

      addRecentActivity(
        "Re-Registration",
        form.registrationNumber || form.chassisNumber || form.engineNumber
      );
    } catch (err) {
      alert(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl shadow w-[90%] md:w-96">
            <h3 className="font-medium text-lg mb-3">RC Personal Details</h3>

            <div className="text-sm space-y-1">
              <p><b>Owner Name:</b> {popup.ownerName}</p>
              <p><b>Office Code:</b> {popup.officeCode}</p>
              <p><b>Vehicle Class:</b> {popup.vehicleClass}</p>
              <p><b>Color:</b> {popup.color}</p>
              <p><b>Fitness Date:</b> {popup.fitnessDate}</p>
              <p><b>Record Found In:</b> {popup.recordFoundIn}</p>
            </div>

            <button
              className="mt-3 border px-3 py-1 rounded text-sm"
              onClick={() => setPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Re-Registration Verification
          </h1>

          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Search and verify vehicle registration details from Vahan Database
          </p>
        </div>

        <button className="bg-white border px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 self-end">
          <FiUpload />
          Bulk Upload
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow md:col-span-3 p-4">
          <h3 className="font-semibold mb-3 text-sm">Search Criteria</h3>

          <div className="flex flex-wrap items-center gap-2">
            <input
              className="border p-2 rounded text-sm bg-gray-50 w-[160px]"
              name="registrationNumber"
              placeholder="Registration Number"
              onChange={handleChange}
              value={form.registrationNumber}
            />

            <input
              className="border p-2 rounded text-sm bg-gray-50 w-[150px]"
              name="chassisNumber"
              placeholder="Chassis Number"
              onChange={handleChange}
              value={form.chassisNumber}
            />

            <input
              className="border p-2 rounded text-sm bg-gray-50 w-[150px]"
              name="engineNumber"
              placeholder="Engine Number"
              onChange={handleChange}
              value={form.engineNumber}
            />

            <input
              className="border p-2 rounded flex-1 text-sm bg-gray-50 min-w-[160px]"
              name="mobileNumber"
              placeholder="Mobile Number"
              disabled
              value={form.mobileNumber}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
            >
              <FiSearch />
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <h3 className="text-xs md:text-sm font-bold">Total View Count</h3>

          <p className="text-3xl md:text-5xl font-bold mt-2 text-blue-700">
            {result?.vehicleInformation?.length || 0}
          </p>
        </div>
      </div>

      {/* ───────── VEHICLE INFORMATION ───────── */}
      {result && Array.isArray(result.vehicleInformation) && result.vehicleInformation.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h3 className="text-sm font-bold mb-2">Vehicle Information</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border">
              <thead className="bg-gray-100">
                <tr className="uppercase text-gray-800">
                  <th className="p-2 border text-left">Sr No</th>
                  <th className="p-2 border text-left">Registration Number</th>
                  <th className="p-2 border text-left">Chassis Number</th>
                  <th className="p-2 border text-left">Engine Number</th>
                  <th className="p-2 border text-left">Make</th>
                  <th className="p-2 border text-left">Model</th>
                  <th className="p-2 border text-left">Registration Year</th>
                  <th className="p-2 border text-left">Colour</th>
                  <th className="p-2 border text-left">RTO Code</th>
                  <th className="p-2 border text-center">RC Details</th>
                </tr>
              </thead>

              <tbody>
                {result.vehicleInformation.map((v, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{v.registrationNumber}</td>
                    <td className="p-2 border">{v.chassisNumber}</td>
                    <td className="p-2 border">{v.engineNumber}</td>
                    <td className="p-2 border">{v.make}</td>
                    <td className="p-2 border">{v.model}</td>
                    <td className="p-2 border">{v.registrationYear}</td>
                    <td className="p-2 border">{v.colour}</td>
                    <td className="p-2 border">{v.rtoCode}</td>

                    <td className="p-2 border text-center">
                      <button
                        className="border px-2 py-0.5 rounded text-[10px]"
                        onClick={() => setPopup(result.popupDetails[i])}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ───────── SEARCH VEHICLE DETAILS ───────── */}
      {result && result.searchVehicleDetails && (
        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h3 className="text-sm font-bold mb-2">Search Vehicle Details</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border">
              <thead className="bg-gray-100">
                <tr className="uppercase text-gray-800">
                  <th className="border p-2">Sr No</th>
                  <th className="border p-2">Vehicle Number</th>
                  <th className="border p-2">Office Code</th>
                  <th className="border p-2">Chassis Number</th>
                  <th className="border p-2">Owner Name</th>
                  <th className="border p-2">Vehicle Class</th>
                  <th className="border p-2">Color</th>
                  <th className="border p-2">Fitness Date</th>
                  <th className="border p-2">Record Found In</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(result.searchVehicleDetails)
                  ? result.searchVehicleDetails.map((v, i) => (
                      <tr key={i}>
                        <td className="border p-2">{i + 1}</td>
                        <td className="border p-2">{v.vehicleNumber}</td>
                        <td className="border p-2">{v.officeCode}</td>
                        <td className="border p-2">{v.chassisNumber}</td>
                        <td className="border p-2">{v.ownerName}</td>
                        <td className="border p-2">{v.vehicleClass}</td>
                        <td className="border p-2">{v.color}</td>
                        <td className="border p-2">{v.fitnessDate}</td>
                        <td className="border p-2">{v.recordFoundIn}</td>
                      </tr>
                    ))
                  : (
                      <tr>
                        <td colSpan="9" className="p-3 text-center">
                          No data found
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>

          {loading && (
            <p className="mt-2 text-center text-gray-500 text-sm">
              Loading...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
