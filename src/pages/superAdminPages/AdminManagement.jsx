import { useEffect, useState, useCallback } from "react";
import { createAdmin, getAdmins } from "../../services/superadmin.service";
import { FiUsers, FiUserCheck, FiShield, FiClock, FiDownload,FiSearch  } from "react-icons/fi";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("admins");


const loadAdmins = useCallback(async () => {
  const res = await getAdmins({ page, limit });
  setAdmins(res.admins);
  setTotal(res.total);
}, [page, limit]);

useEffect(() => {
  loadAdmins();
}, [loadAdmins]);

  const handleCreateAdmin = async () => {
    try {
      if (!form.name || !form.email || !form.password) {
        alert("All fields are required");
        return;
      }

      await createAdmin(form);
      alert("Admin created successfully");

      setForm({ name: "", email: "", password: "" });
      setShowModal(false);
      loadAdmins();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredAdmins = admins.filter((a) =>
  `${a.name} ${a.email}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP CARDS */}
<div className="grid grid-cols-4 gap-6 mb-8">
  <Card
    title="Total Users"
    value="1,248"
    icon={FiUsers}
    iconBg="bg-blue-100"
    iconColor="text-blue-600"
  />
  <Card
    title="Total Admins"
    value={total}
    icon={FiShield}
    iconBg="bg-indigo-100"
    iconColor="text-indigo-600"
  />
  <Card
    title="Active Verifications"
    value="186"
    icon={FiUserCheck}
    iconBg="bg-green-100"
    iconColor="text-green-600"
  />
  <Card
    title="Pending Approvals"
    value="27"
    icon={FiClock}
    iconBg="bg-yellow-100"
    iconColor="text-yellow-600"
  />
</div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Tabs + Actions */}
          <div className="flex justify-between items-center mb-4">
<div className="flex gap-6 border-b mb-4">
  <button
    onClick={() => setActiveTab("admins")}
    className={`pb-2 font-medium ${
      activeTab === "admins"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500"
    }`}
  >
    Admins
  </button>

  <button
    onClick={() => setActiveTab("users")}
    className={`pb-2 font-medium ${
      activeTab === "users"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500"
    }`}
  >
    Users
  </button>
</div>
          </div>

          {/* Search & Filters */}
<div className="flex justify-between items-center mb-4">
  {/* LEFT: Search */}
<div className="relative">
  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

  <input
    className="border rounded-xl pl-11 pr-4 py-2 text-sm w-[420px]
               focus:ring-2 focus:ring-blue-500 outline-none"
    placeholder="Name / Email / Phone / ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


  {/* RIGHT: Filters + Actions */}
  <div className="flex items-center gap-3">
    <select className="border rounded-xl px-5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
      <option>Role: All</option>
    </select>

    <select className="border rounded-xl px-5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
      <option>Status: All</option>
    </select>

    <button className="flex items-center gap-2 border rounded-xl px-5 py-2 text-sm  hover:bg-gray-50 focus:ring-blue-500 outline-none">
      <FiDownload className="text-sm" />
      Export CSV
    </button>

    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white border rounded-xl px-5 py-2 text-sm"
    >
      + Add Admin
    </button>
  </div>
</div>

          {/* TABLE */}
          {activeTab === "admins" ? (
          <table className="w-full border">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Created On</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-4 ">{a.name}</td>
                  <td>{a.email}</td>
                  <td>Admin</td>
                  <td>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
) : (
  <div className="text-center py-16 text-gray-400 text-sm">
    No users
  </div>
)}
          {/* PAGINATION */}
<div className="flex justify-end items-center gap-4 mt-4">
{total > 0 && (
  <span className="text-sm text-gray-500">
    Showing {(page - 1) * limit + 1}–
    {Math.min(page * limit, total)} of {total}
  </span>
)}
  <button
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Previous
  </button>

  <button
    disabled={page * limit >= total}
    onClick={() => setPage((p) => p + 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

        </div>
      </div>

      {/* ADD ADMIN MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">

      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Add New Admin
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Create a new admin account with login credentials
      </p>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter full name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateAdmin}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Create Admin
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

/* SMALL CARD COMPONENT */
function Card({ title, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase">
          {title}
        </p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`p-3 rounded-full ${iconBg}`}>
        <Icon className={`text-xl ${iconColor}`} />
      </div>
    </div>
  );
}
