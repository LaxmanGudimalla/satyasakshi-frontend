import React, { useEffect, useState } from "react";
import { getRecentActivity, formatTime, getTotalSearchCount  } from "../../helpers/recentActivity.helper";
import { getRecoveredVehiclesCount } from "../../services/admin.service";
import { getStolenVehiclesCount } from "../../services/admin.service";

import {
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiTruck ,
  FiAlertTriangle
} from "react-icons/fi";

const getStats = (recoveredCount,stolenCount) => [
  {
    title: "Total Searches",
    value: getTotalSearchCount(),
    change: "based on activity log",
    changeColor: "text-blue-600",
    icon: <FiSearch className="text-blue-600" />,
    iconBg: "bg-blue-100"
  },
  {
    title: "Verified Vehicles",
    value: "987",
    change: "+8% from last month",
    changeColor: "text-green-600",
    icon: <FiCheckCircle className="text-green-600" />,
    iconBg: "bg-green-100"
  },
  {
  title: "Stolen Vehicles",
  value: stolenCount,
  change: "Reported cases",
  changeColor: "text-red-600",
  icon: <FiAlertTriangle className="text-red-600" />,
  iconBg: "bg-red-100"
},

  {
    title: "Recovered Vehicles",
    value: recoveredCount,   // Get Actual Count from DB
    change: "Until today",
    changeColor: "text-green-600",
    icon: <FiTruck className="text-red-600" />,
    iconBg: "bg-red-100"
  }
];



export default function AdminDashboard() {

  const [activities, setActivities] = useState([]);
  const [recoveredCount, setRecoveredCount] = useState(0);
  const [stolenCount, setStolenCount] = useState(0);


  useEffect(() => {
    const list = getRecentActivity();
    setActivities(list);
  }, []);

  useEffect(() => {
  const fetchRecoveredCount = async () => {
    try {
      const res = await getRecoveredVehiclesCount();
      if (res.success) {
        setRecoveredCount(res.total);
      }
    } catch (err) {
      console.error("Recovered count error", err);
    }
  };

  fetchRecoveredCount();
}, []);

useEffect(() => {
  const fetchStolenCount = async () => {
    try {
      const res = await getStolenVehiclesCount();
      if (res.success) {
        setStolenCount(res.total);
      }
    } catch (err) {
      console.error("Stolen count error", err);
    }
  };

  fetchStolenCount();
}, []);



  return (
    <div>
      <p className="text-gray-500 mb-6">
        Overview of vehicle verification system
      </p>

      {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {getStats(recoveredCount,stolenCount).map((item, i) => (
    <div
      key={i}
      className="bg-white p-6 rounded-xl shadow flex justify-between items-start"
    >
      {/* LEFT CONTENT */}
      <div>
        <p className="text-gray-500 text-sm">{item.title}</p>
        <h2 className="text-2xl font-bold">{item.value}</h2>
        <p className={`text-xs mt-1 ${item.changeColor}`}>
          {item.change}
        </p>
      </div>

      {/* RIGHT ICON */}
      <div
        className={`p-3 rounded-lg ${item.iconBg} flex items-center justify-center`}
      >
        {item.icon}
      </div>
    </div>
  ))}
</div>


      {/* RECENT ACTIVITY */}
{/* RECENT ACTIVITY */}
<div className="bg-white rounded-xl shadow p-6">

  {/* FIXED – always visible */}
  <h3 className="font-semibold mb-4 sticky top-0 bg-white z-10">
    Recent Activity
  </h3>

  {/* ONLY ROWS WILL SCROLL */}
  <div className="h-[350px] overflow-y-auto">
    {activities.map((item, i) => (
      <div
        key={i}
        className="flex justify-between items-center border-b py-3"
      >
        <div>
          <p className="font-medium">{item.id}</p>
          <p className="text-xs text-gray-500">{item.type}</p>
        </div>

        <span className="text-xs text-gray-400">
          {formatTime(item.time)}
        </span>
      </div>
    ))}

    {activities.length === 0 && (
      <p className="text-sm text-gray-400 text-center mt-6">
        No recent activity found
      </p>
    )}
  </div>

</div>

    </div>
  );
}