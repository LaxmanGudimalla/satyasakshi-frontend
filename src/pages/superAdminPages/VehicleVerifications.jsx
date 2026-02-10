import { useEffect, useState } from "react";
import {
  getPendingRecovered,
  getPendingStolen,
  approveRecovered,
  approveStolen,
  rejectRecovered,
  rejectStolen
} from "../../services/superadmin.service";

export default function VehicleVerifications() {
  const [activeTab, setActiveTab] = useState("recovered");
  const [recoveredList, setRecoveredList] = useState([]);
  const [stolenList, setStolenList] = useState([]);

  useEffect(() => {
    loadRecovered();
    loadStolen();
  }, []);

  const loadRecovered = async () => {
    try {
      const res = await getPendingRecovered();
      setRecoveredList(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStolen = async () => {
    try {
      const res = await getPendingStolen();
      setStolenList(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveRecovered = async (id) => {
    await approveRecovered(id);
    loadRecovered();
  };

  const handleRejectRecovered = async (id) => {
    await rejectRecovered(id);
    loadRecovered();
  };

  const handleApproveStolen = async (id) => {
    await approveStolen(id);
    loadStolen();
  };

  const handleRejectStolen = async (id) => {
    await rejectStolen(id);
    loadStolen();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Verification</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "recovered"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("recovered")}
        >
          Recovered Requests
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activeTab === "stolen"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("stolen")}
        >
          Stolen Requests
        </button>
      </div>

      {/* ================= Recovered ================= */}
      {activeTab === "recovered" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Reg No</th>
              <th className="border p-2">Engine</th>
              <th className="border p-2">Chassis</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recoveredList.map((v) => (
              <tr key={v.id}>
                <td className="border p-2">{v.registration_number}</td>
                <td className="border p-2">{v.engine_number}</td>
                <td className="border p-2">{v.chassis_number}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handleApproveRecovered(v.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleRejectRecovered(v.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= Stolen ================= */}
      {activeTab === "stolen" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Reg No</th>
              <th className="border p-2">Engine</th>
              <th className="border p-2">Chassis</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stolenList.map((v) => (
              <tr key={v.id}>
                <td className="border p-2">{v.registration_number}</td>
                <td className="border p-2">{v.engine_number}</td>
                <td className="border p-2">{v.chassis_number}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handleApproveStolen(v.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleRejectStolen(v.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
