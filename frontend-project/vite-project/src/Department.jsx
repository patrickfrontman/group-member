import React, { useEffect, useState } from "react";
import { Plus, X, Layers, TrendingUp } from "lucide-react";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    departmentCode: "",
    departmentName: "",
    GrossSalary: "",
  });

  // GET DEPARTMENTS
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  // CREATE
  const createDepartment = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      fetchDepartments();
      setIsModal(false);

      setForm({
        departmentCode: "",
        departmentName: "",
        GrossSalary: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Department Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage all company departments
          </p>
        </div>

        <button
          onClick={() => setIsModal(true)}
          className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-800 text-white px-3 py-2 rounded-2xl flex items-center gap-2 transition"
        >
          <Plus size={18} /> Add Department
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <Layers className="text-blue-600 mb-2" />
          <h2 className="text-xl font-bold">{departments.length}</h2>
          <p className="text-gray-500 text-sm">Total Departments</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <TrendingUp className="text-green-600 mb-2" />
          <h2 className="text-xl font-bold">
            {departments.reduce((sum, d) => sum + Number(d.GrossSalary || 0), 0)}
          </h2>
          <p className="text-gray-500 text-sm">Total Salary Budget</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <Layers className="text-purple-600 mb-2" />
          <h2 className="text-xl font-bold">Active</h2>
          <p className="text-gray-500 text-sm">System Status</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Department</th>
              <th className="p-3">Gross Salary</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dep) => (
              <tr
                key={dep._id}
                className="border-b border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{dep.departmentCode}</td>
                <td className="p-3">{dep.departmentName}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {dep.GrossSalary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[420px] p-6 rounded-2xl shadow-lg relative">

            <button
              onClick={() => setIsModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-lg font-bold mb-4">Create Department</h2>

            <form onSubmit={createDepartment} className="space-y-6">

              <input
                placeholder="Department Code"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none rounded-2xl border-gray-200 bg-gray-50 text-xs"
                value={form.departmentCode}
                onChange={(e) =>
                  setForm({ ...form, departmentCode: e.target.value })
                }
              />

              <input
                placeholder="Department Name"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none rounded-2xl border-gray-200 bg-gray-50 text-xs"
                value={form.departmentName}
                onChange={(e) =>
                  setForm({ ...form, departmentName: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Gross Salary"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none rounded-2xl border-gray-200 bg-gray-50 text-xs"
                value={form.GrossSalary}
                onChange={(e) =>
                  setForm({ ...form, GrossSalary: e.target.value })
                }
              />
              <input
  type="number"
  placeholder="Default Deduction"
  className="w-full rounded-2xl bg-gray-50 border border-gray-300 px-4 py-3 text-xs"
  value={form.DefaultDeduction}
  onChange={(e) =>
    setForm({
      ...form,
      DefaultDeduction: e.target.value,
    })
  }
/>

              <button className="w-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 text-white p-2 transition rounded-2xl">
                Save Department
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentPage;