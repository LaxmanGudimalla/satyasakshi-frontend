import {
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle
} from "react-icons/fi";

const stats = [
  {
    title: "Total Searches",
    value: "1,234",
    change: "+12% from last month",
    changeColor: "text-green-600",
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
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Overview of vehicle verification system
      </p>

      {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {stats.map((item, i) => (
    <div
      key={i}
      className="bg-white p-6 rounded shadow flex justify-between items-start"
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
      <div className="bg-white rounded shadow p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>

        {[
          { id: "MH12AB1234", type: "Challan Check", status: "Completed", time: "2 mins ago" },
          { id: "DL01CD5678", type: "Insurance Verification", status: "Completed", time: "15 mins ago" },
          { id: "KA03EF9012", type: "Service History", status: "Pending", time: "1 hour ago" },
          { id: "TN09GH3456", type: "Re-Registration", status: "Completed", time: "2 hours ago" }
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center border-b py-3">
            <div>
              <p className="font-medium">{item.id}</p>
              <p className="text-xs text-gray-500">{item.type}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}