import { useState } from "react";
import { searchReRegistration } from "../../services/admin.service";
import { FiSearch,FiUpload  } from "react-icons/fi";


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
    } catch (err) {
      alert(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
   {/* ---------- POPUP ---------- */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow w-96">
            <h3 className="font-medium text-lg mb-4">RC Personal Details</h3>

            <div className="text-sm space-y-2">
              <p><b>Owner Name:</b> {popup.ownerName}</p>
              <p><b>Office Code:</b> {popup.officeCode}</p>
              <p><b>Vehicle Class:</b> {popup.vehicleClass}</p>
              <p><b>Color:</b> {popup.color}</p>
              <p><b>Fitness Date:</b> {popup.fitnessDate}</p>
              <p><b>Record Found In:</b> {popup.recordFoundIn}</p>
            </div>

            <button
              className="mt-4 border px-4 py-1 rounded"
              onClick={() => setPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* ───────── HEADER ROW ───────── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Re-Registration Verification
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Search and verify vehicle registration details from Vahan Database
          </p>
        </div>

<button className="bg-gray-100 border px-4 py-2 rounded-lg text-sm flex items-center gap-2">
  <FiUpload className="text-black" />
  Bulk Upload
</button>

      </div>


      {/* ───────── TOP SECTION ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">

        {/* ───── SEARCH CRITERIA CARD ───── */}
<div className="bg-white rounded-xl shadow col-span-3 p-5 max-w-[840px] mx-auto">

  <h3 className="font-semibold mb-4">
    Search Criteria
  </h3>

  {/* INLINE CONSTRAINED ROW */}
  <div className="flex items-center gap-3">

    <input
      className="border p-2 rounded text-sm bg-gray-50"
      name="registrationNumber"
      placeholder="Registration Number"
      onChange={handleChange}
      value={form.registrationNumber}
      style={{ maxWidth: "180px" }}     // ONLY VISUAL LIMIT
    />

    <input
      className="border p-2 rounded text-sm bg-gray-50"
      name="chassisNumber"
      placeholder="Chassis Number"
      onChange={handleChange}
      value={form.chassisNumber}
      style={{ maxWidth: "160px" }}
    />

    <input
      className="border p-2 rounded text-sm bg-gray-50"
      name="engineNumber"
      placeholder="Engine Number"
      onChange={handleChange}
      value={form.engineNumber}
      style={{ maxWidth: "160px" }}
    />

    {/* MOBILE NUMBER – existing */}
    <input
      className="border p-2 rounded flex-1 text-sm bg-gray-50"
      name="mobileNumber"
      placeholder="Mobile Number"
      disabled
      value={form.mobileNumber}
    />

    {/* SEARCH BUTTON INLINE */}
    <button
      onClick={handleSearch}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
    >
      <FiSearch className="text-white" />
      Search
    </button>

  </div>
</div>




        {/* ───── TOTAL VIEW COUNT CARD ───── */}
        <div className="bg-white rounded-xl shadow p-5 text-center max-w-[320px] mx-auto">
          <h3 className="text-sm font-bold">
            Total View Count
          </h3>

          <p className="text-5xl font-bold text-blue-700 mt-3">
            {result?.vehicleInformation?.length || 0}
          </p>
        </div>

      </div>


      {/* ───────── VEHICLE INFORMATION TABLE ───────── */}
      <div className="bg-white rounded-xl shadow p-5 mt-5">
        <h3 className="text-sm font-bold mb-3">
          Vehicle Information
        </h3>

        <table className="w-full text-xs border">
          <thead className="bg-gray-100">
            <tr className="uppercase text-blue-700">
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
            {result?.vehicleInformation?.map((v, i) => (
              <tr key={i}>
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{v.registrationNumber}</td>
                <td className="p-2 border">{v.chassisNumber}</td>
                <td className="p-2 border">{v.engineNumber}</td>
                <td className="p-2 border">{v.make}</td>
                <td className="p-2 border">{v.model}</td>
                <td className="p-2 border">{v.registrationYear}</td>
                <td className="p-2 border">{v.colour}</td>
                <td className="p-2 border">{v.officeCode}</td>

                <td className="p-2 border text-center">
                  <button
                    className="border px-3 py-1 rounded text-[10px]"
                    onClick={() => setPopup(result.popupDetails[i])}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {!result?.vehicleInformation?.length && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-400">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* ───────── SEARCH VEHICLE DETAILS SECTION ───────── */}
      {result?.searchVehicleDetails && (
        <div className="bg-white rounded-xl shadow p-5 mt-5">

          <h4 className="text-center text-green-600 text-sm font-semibold mb-3">
            Search Result for the Engine No {form.engineNumber}
          </h4>

          <table className="w-full text-xs border">
            <thead className="bg-gray-100">
              <tr className="uppercase text-gray-500">
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
                  <td classNameName="border p-2">{v.vehicleClass}</td>
                  <td className="border p-2">{v.color}</td>
                  <td className="border p-2">{v.fitnessDate}</td>
                  <td className="border p-2">{v.recordFoundIn}</td>
                </tr>))
                : (
                    <tr>
                      <td colSpan="9" className="p-4 text-center">
                        No data found
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>

          {loading && (
            <p className="mt-3 text-center text-gray-500 text-sm">
              Loading...
            </p>
          )}

        </div>
      )}

    </div>
  );
}
