import { useEffect, useState } from "react";
import { createAdmin, getAdmins } from "../../services/superadmin.service";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const loadAdmins = async () => {
    const res = await getAdmins();
    setAdmins(res.admins);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card title="Total Users" value="1,248" />
          <Card title="Total Admins" value={admins.length} />
          <Card title="Active Verifications" value="186" />
          <Card title="Pending Approvals" value="27" />
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Tabs + Actions */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6 border-b">
              <button className="border-b-2 border-blue-600 pb-2 text-blue-600 font-medium">
                Admins
              </button>
              <button className="pb-2 text-gray-500">Users</button>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Admin
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-4 mb-4">
            <input
              className="input w-1/3"
              placeholder="Name / Email / Phone / ID"
            />
            <select className="input w-40">
              <option>Role: All</option>
            </select>
            <select className="input w-40">
              <option>Status: All</option>
            </select>
          </div>

          {/* TABLE */}
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Created On</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2 ">{a.name}</td>
                  <td>{a.email}</td>
                  <td>Admin</td>
                  <td>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

      {/* ADD ADMIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Add Admin</h2>

            <input
              className="input mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="input mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="input mb-4"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAdmin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SMALL CARD COMPONENT */
function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
