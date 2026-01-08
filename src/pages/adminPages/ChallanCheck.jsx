import { useState } from "react";
import { searchChallans } from "../../services/admin.service";
import { FiUpload } from "react-icons/fi";
import { addRecentActivity } from "../../helpers/recentActivity.helper";
export default function ChallanCheck() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [rows, setRows] = useState([]);
  const [totalChallanCount, setTotalChallanCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [incidentFilter, setIncidentFilter] = useState("ALL");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setError("");
    setRows([]);

    if (!registrationNumber) {
      setError("Enter Registration Number");
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);

      const params = new URLSearchParams({
        registrationNumber
      }).toString();

      const res = await searchChallans(params);

      if (res.success) {
        setRows(res.data.rows);
        setTotalChallanCount(res.data.totalChallanCount);
        setTotalValue(res.data.totalValue);
      } else {
        setError(res.message || "No challans found");
      }

    addRecentActivity("Challan Check", registrationNumber);

    } catch {
      setError("Failed to fetch challan data");
    } finally {
      setLoading(false);
    }
  };

  const filteredRows =
  incidentFilter === "ALL"
    ? rows
    : rows.filter(
        r => r.incidentType?.toUpperCase() === incidentFilter
      );


  return (
    <div className="p-6">


      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Challan Check</h1>
          <p className="text-sm text-gray-700">
            Search challans by registration number
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded">
          <FiUpload /> Bulk Upload
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) =>
              setRegistrationNumber(e.target.value.toUpperCase())
            }
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded px-6"
          >
            Search
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
{hasSearched && rows.length > 0 && (
  <>
      {/* SUMMARY */}
<div className="grid grid-cols-3 gap-4 mb-6">
  {/* Total Count */}
  <div className="bg-white p-4 rounded shadow">
    <p>Total Challan Count</p>
    <h2 className="text-2xl font-bold">{totalChallanCount}</h2>
  </div>

  {/* Total Amount */}
  <div className="bg-white p-4 rounded shadow">
    <p>Total Challan Amount</p>
    <h2 className="text-2xl font-bold">₹ {totalValue}</h2>
  </div>

  {/* Incident Filter */}
  <div className="bg-white p-4 rounded shadow">
    <p className="font-medium mb-2">Incident</p>
    <div className="flex gap-4">
      {["ALL", "AFTER", "BEFORE"].map(type => (
        <label key={type} className="flex items-center gap-2">
          <input
            type="radio"
            name="incident"
            checked={incidentFilter === type}
            onChange={() => setIncidentFilter(type)}
          />
          {type}
        </label>
      ))}
    </div>
  </div>
</div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Sr</th>
              <th className="border">Reg No</th>
              <th className="border">Make</th>
              <th className="border">Model</th>
              <th className="border">Color</th>
              <th className="border">MFG Year</th>
              <th className="border">Theft Date</th>
              <th className="border">Challan After & Before <br/> Incident</th>
              <th className="border">Challan No</th>
              <th className="border">No. of Challans</th>
              <th className="border">Total Value</th>
              <th className="border">ID Submitted</th>
<th className="border">View ID</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="13" className="p-6 text-center">Loading…</td></tr>
            ) : rows.length ? (
             filteredRows.map(r => (
                <tr key={r.srNo}>
                  <td className="border p-2">{r.srNo}</td>
                  <td className="border">{r.registrationNumber}</td>
                  <td className="border">{r.make}</td>
                  <td className="border">{r.model}</td>
                  <td className="border">{r.colour}</td>
                  <td className="border">{r.mfgYear}</td>
                  <td className="border">
                    {r.theftDate
                      ? new Date(r.theftDate).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td className="border">{r.incidentType}</td>
                  <td className="border">{r.challanNumber}</td>
                  <td className="border">{r.noOfChallan}</td>
                  <td className="border">₹ {r.totalValue}</td>
                  <td className="border text-center">
  {r.idSubmitted === "Yes" ? (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
      Yes
    </span>
  ) : (
    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
      No
    </span>
  )}
</td>

<td className="border text-blue-600 underline text-center cursor-pointer">
  View
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="p-6 text-center text-gray-500">
                  No data found
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
