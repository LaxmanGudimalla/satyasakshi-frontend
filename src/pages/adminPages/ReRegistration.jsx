import { useState } from "react";
import { searchReRegistration } from "../../services/admin.service";

export default function ReRegistration() {
  const [form, setForm] = useState({
    registrationNumber: "",
    chassisNumber: "",
    engineNumber: "",
    mobileNumber: ""
  });

  const [result, setResult] = useState(null);
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
      setResult(res.data);
    } catch (err) {
      alert(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* SEARCH CRITERIA */}
      <div className="flex gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow flex-1">
          <h3 className="font-medium mb-4">Search Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input className="border p-2 rounded" name="registrationNumber" placeholder="Registration Number" onChange={handleChange} />
            <input className="border p-2 rounded" name="chassisNumber" placeholder="Chasis Number" onChange={handleChange} />
            <input className="border p-2 rounded" name="engineNumber" placeholder="Engine Number" onChange={handleChange} />
            <input className="border p-2 rounded" name="mobileNumber" placeholder="Mobile Number" disabled />
            <button onClick={handleSearch} className="bg-blue-600 text-white rounded px-4">
              Search
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow w-48 text-center">
          <p className="text-sm text-gray-500">Total View Count</p>
          <p className="text-4xl font-bold text-blue-600">10</p>
        </div>
      </div>

      {/* VEHICLE INFORMATION TABLE */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h3 className="font-medium mb-3">Vehicle Information</h3>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Sr. No</th>
              <th className="border p-2">Registration Number</th>
              <th className="border p-2">Chassis Number</th>
              <th className="border p-2">Engine Number</th>
              <th className="border p-2">Make</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Registration Year</th>
              <th className="border p-2">Colour</th>
              <th className="border p-2">RTO Code</th>
              <th className="border p-2">RC Details</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i}>
                <td className="border p-2">{i}</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEARCH VEHICLE DETAILS */}
      {result && (
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Search Vehicle Details</h3>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded-lg text-sm">Print</button>
              <button className="border px-3 py-1 rounded-lg text-sm">Back</button>
            </div>
          </div>

          <p className="text-green-600 font-medium text-center mb-4">
            Search Result for the Engine No {form.engineNumber}
          </p>

          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Sr. No</th>
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
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">AR01J9030</td>
                <td className="border p-2">AR1</td>
                <td className="border p-2">{result.personalInformation?.address}</td>
                <td className="border p-2">{result.personalInformation?.fullName}</td>
                <td className="border p-2">MOTOR CAR</td>
                <td className="border p-2">WHITE</td>
                <td className="border p-2">31 Jul, 2031</td>
                <td className="border p-2">V4</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
    </div>
  );
}
