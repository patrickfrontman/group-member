import React, { useEffect, useState, useRef } from "react";
import { Edit3, Plus, Trash, X, Wallet, Users, BadgeDollarSign } from "lucide-react";

function SalaryPage() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const [updatemode, setUpdatemode] = useState(false);

  const deductionRef = useRef(null);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    department: "",
    GrossSalary: "",
    TotalDeduction: "",
    month: "",
  });

  const token = localStorage.getItem("token");

  // ---------------- FETCH ----------------
  const fetchSalaries = async () => {
    const res = await fetch("http://localhost:5000/salaries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSalaries(data.salaries || []);
  };

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEmployees(data.employees || []);
  };

  const fetchDepartments = async () => {
    const res = await fetch("http://localhost:5000/departments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDepartments(data.departments || []);
  };

  // ---------------- CREATE ----------------
  const createSalary = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch("http://localhost:5000/salaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setLoading(false);
    fetchSalaries();
    resetForm();
    setIsModal(false);
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`http://localhost:5000/salaries/${selectedSalary}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setLoading(false);
    fetchSalaries();
    resetForm();
    setUpdatemode(false);
    setIsModal(false);
  };

  // ---------------- DELETE ----------------
  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Delete this salary record?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/salaries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchSalaries();
  };

  // ---------------- EDIT ----------------
  const handleEdit = (sal) => {
    setUpdatemode(true);
    setSelectedSalary(sal._id);

    setForm({
      employee: sal.employee?._id || "",
      department: sal.employee?.department?._id || "",
      GrossSalary: sal.GrossSalary || "",
      TotalDeduction: sal.TotalDeduction || "",
      month: sal.month || "",
    });

    setSelectedEmployee(sal.employee);
    setIsModal(true);
  };

  // ---------------- RESET ----------------
  const resetForm = () => {
    setForm({
      employee: "",
      department: "",
      GrossSalary: "",
      TotalDeduction: "",
      month: "",
    });
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
    fetchDepartments();
  }, []);

  // ---------------- TOTALS ----------------
  const totalGross = salaries.reduce((a, b) => a + Number(b.GrossSalary || 0), 0);
  const totalDeduction = salaries.reduce((a, b) => a + Number(b.TotalDeduction || 0), 0);
  const totalNet = salaries.reduce((a, b) => a + Number(b.NetSalary || 0), 0);

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Salary Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage employee salary records
          </p>
        </div>

        <button
          onClick={() => {
            setUpdatemode(false);
            resetForm();
            setIsModal(true);
          }}
          className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 text-white px-4 py-1.5 rounded-2xl flex relative pl-6.5"
        >
          <Plus className="top-2.5 left-2 absolute" size={16} /> Add Salary
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-2xl hover:shadow-lg h-[140px] transition-all duration-500">
          <p>Total Gross</p>
          <h2 className="text-xl font-bold">${totalGross}</h2>
        </div>

        <div className="bg-white p-4 rounded-2xl hover:shadow-lg h-[140px] transition-all duration-500">
          <p>Total Deduction</p>
          <h2 className="text-xl font-bold text-red-500">${totalDeduction}</h2>
        </div>

        <div className="bg-white p-4 rounded-2xl hover:shadow-lg h-[140px] transition-all duration-500">
          <p>Total Net</p>
          <h2 className="text-xl font-bold text-green-600">${totalNet}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3">Gross</th>
              <th className="p-3">Deduction</th>
              <th className="p-3">Net</th>
              <th className="p-3">Month</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {salaries.length === 0 && (
              <tr className="">
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No salary records found
                </td>
              </tr>
            )}

            {salaries.map((sal) => (
              <tr key={sal._id} className="border-b border-gray-300 hover:bg-gray-50">

                <td className="p-3 font-medium">
                  {sal.employee?.firstname} {sal.employee?.lastname}
                </td>

                <td className="p-3">
                  {sal.employee?.department?.departmentName}
                </td>

                <td className="p-3 text-center">${sal.GrossSalary}</td>
                <td className="p-3 text-center text-red-500">${sal.TotalDeduction}</td>
                <td className="p-3 text-center text-green-600">${sal.NetSalary}</td>

                <td className="p-3 text-center">{sal.month}</td>

                <td className="p-3 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(sal)}>
                    <Edit3 size={16} />
                  </button>

                  <button onClick={() => handledelete(sal._id)}>
                    <Trash size={16} className="text-red-500" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {isModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[420px] rounded-xl p-5">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">
                {updatemode ? "Update Salary" : "Add Salary"}
              </h2>

              <button onClick={() => setIsModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={updatemode ? handleUpdate : createSalary} className="space-y-3">

              {/* EMPLOYEE */}
              <select
                value={form.employee}
                onChange={(e) => {
                  const emp = employees.find(x => x._id === e.target.value);

                  setForm({
                    ...form,
                    employee: e.target.value,
                    department: emp?.department?._id || "",
                    GrossSalary: emp?.salary || "",
                    TotalDeduction: emp?.department?.defaultDeduction || 0
                  });

                  setSelectedEmployee(emp);

                  setTimeout(() => {
                    deductionRef.current?.focus();
                  }, 100);
                }}
                className="w-full border p-2 rounded-2xl border-gray-300 text-xs px-4 py-3 text-gray-900 bg-gray-100"
              >
                <option>Select Employee</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstname} {emp.lastname}
                  </option>
                ))}
              </select>

              {/* DEPT */}
              <input
              placeholder="select department"
                value={
                  departments.find(d => d._id === form.department)?.departmentName || ""
                }
                readOnly
                className="w-full border p-2 bg-gray-100 rounded-2xl border-gray-300 text-xs px-4 py-3 text-gray-900 bg-gray-100"
              />

              <input
                type="number"
                placeholder="Gross Salary"
                value={form.GrossSalary}
                onChange={(e) => setForm({ ...form, GrossSalary: e.target.value })}
                className="w-full border p-2 rounded-2xl border-gray-300 text-xs px-4 py-3 text-gray-900 bg-gray-100"
              />

              <input
                ref={deductionRef}
                type="number"
                placeholder="Deduction"
                value={form.TotalDeduction}
                onChange={(e) => setForm({ ...form, TotalDeduction: e.target.value })}
                className="w-full border p-2 rounded-2xl border-gray-300 text-xs px-4 py-3 text-gray-900 bg-gray-100"
              />

              <input
                placeholder="Month"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full border p-2 rounded-2xl border-gray-300 text-xs px-4 py-3 text-gray-900 bg-gray-100"
              />

              <button className="w-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 text-white py-2 rounded-2xl hover:scale-105 duration-500 transition-all">
                {loading ? "Saving..." : "Save"}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default SalaryPage;