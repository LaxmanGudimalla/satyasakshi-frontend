import React, { useEffect, useState } from "react";
import { getRecentActivity, formatTime, getTotalSearchCount  } from "../../helpers/recentActivity.helper";

import {
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle
} from "react-icons/fi";

const getStats = () => [
  {
    title: "Total Searches",
    value: getTotalSearchCount(),     // ✅ real count
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
    title: "Pending Checks",
    value: "45",
    change: "-5% from last month",
    changeColor: "text-red-600",
    icon: <FiClock className="text-yellow-600" />,
    iconBg: "bg-yellow-100"
  },
  {
    title: "Flagged Issues",
    value: "23",
    change: "+3% from last month",
    changeColor: "text-green-600",
    icon: <FiAlertTriangle className="text-red-600" />,
    iconBg: "bg-red-100"
  }
];


export default function AdminDashboard() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const list = getRecentActivity();
    setActivities(list);
  }, []);

  return (
    <div>
      <p className="text-gray-500 mb-6">
        Overview of vehicle verification system
      </p>

      {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {getStats().map((item, i) => (
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