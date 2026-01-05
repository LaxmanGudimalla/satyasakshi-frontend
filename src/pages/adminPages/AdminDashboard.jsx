export default function AdminDashboard() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Overview of vehicle verification system
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Searches", value: "1,234", change: "+12% from last month", color: "text-green-600" },
          { title: "Verified Vehicles", value: "987", change: "+8% from last month", color: "text-green-600" },
          { title: "Pending Checks", value: "45", change: "-5% from last month", color: "text-red-600" },
          { title: "Flagged Issues", value: "23", change: "+3% from last month", color: "text-green-600" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded shadow">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <p className={`text-xs mt-1 ${item.color}`}>{item.change}</p>
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