import { useState } from "react";
import VehicleRecoveredForm from "./VehicleRecoveredForm";
import VehicleStolenForm from "./VehicleStolenForm";

export default function RecoverVehicle() {
  const [activeTab, setActiveTab] = useState("recovered");

  return (
    /* ===== Background ===== */
    <div className="min-h-screen flex justify-center items-start pt-10 pb-10">

      {/* ===== Main Card ===== */}
      <div className="bg-white w-full max-w-5xl rounded-2xl
                      shadow-2xl px-10 py-8">

        {/* ===== Title ===== */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Recover Vehicle
        </h1>

        {/* ===== Tabs Wrapper (CENTERED) ===== */}
        <div className="flex justify-center mb-8">
          <div className="flex justify-center border-b w-[600px] mx-auto">

            {/* Vehicle Stolen */}
            <button
              onClick={() => setActiveTab("stolen")}
              className={`flex-1 text-center px-6 py-2 text-sm font-bold text-blue-900
    ${
      activeTab === "stolen"
        ? "bg-blue-50 text-green-700 border-b-2 border-blue-700"
        : "text-blue-900"
    }`}
            >
              Vehicle Stolen
            </button>

            {/* Vehicle Recovered */}
            <button
              onClick={() => setActiveTab("recovered")}
              className={`flex-1 text-center px-6 py-2 text-sm font-bold
    ${
      activeTab === "recovered"
        ? "bg-green-50 text-green-700 border-b-2 border-blue-700"
        : "text-blue-900"
    }`}
            >
              Vehicle Recovered
            </button>

          </div>
        </div>

        {/* ===== Forms ===== */}
        {activeTab === "recovered" && <VehicleRecoveredForm />}
        {activeTab === "stolen" && <VehicleStolenForm />}

      </div>
    </div>
  );
}
