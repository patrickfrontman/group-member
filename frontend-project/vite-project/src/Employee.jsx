import React, { useEffect, useState } from "react";
import { Plus, X, Search, User } from "lucide-react";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    employeenumber: "",
    firstname: "",
    lastname: "",
    position: "",
    address: "",
    telephone: "",
    gender: "",
    hireddate: "",
    department: "",
  });

  // Load employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (err) {
      console.log("Error loading employees", err.message);
    }
  };

  // Load departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setDepartments(data.departments || []);
    } catch (err) {
      console.log("Error loading departments", err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  // Create employee
  const createEmployee = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      fetchEmployees();
      setIsModal(false);
      resetForm();
    } catch (err) {
      console.log("Error creating employee", err.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      employeenumber: "",
      firstname: "",
      lastname: "",
      position: "",
      address: "",
      telephone: "",
      gender: "",
      hireddate: "",
      department: "",
    });
  };

  // Search filter
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstname} ${emp.lastname} ${emp.employeenumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <User className="text-blue-600" />
            Employees
          </h1>
          <p className="text-sm text-gray-500">
            Manage company employees
          </p>
        </div>

        <button
          onClick={() => setIsModal(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-2xl"
        >
          <Plus size={16} />
          Add employee
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl mb-4 border border-gray-200">
        <Search size={16} className="text-gray-500" />
        <input
          className="w-full outline-none"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Emp No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Department</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id} className="border-b border-gray-300">
                <td className="p-3">{emp.employeenumber}</td>

                <td className="p-3">
                  {emp.firstname} {emp.lastname}
                </td>

                <td className="p-3">{emp.position}</td>

                <td className="p-3">{emp.gender}</td>

                <td className="p-3">
                  {emp.department?.departmentName}
                </td>

                <td className="p-3">{emp.telephone}</td>

                <td className="p-3 text-gray-500">
                  {emp.hireddate
                    ? new Date(emp.hireddate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[400px] p-6 rounded-xl relative">

            <button
              onClick={() => setIsModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Add Employee
            </h2>

            <form onSubmit={createEmployee} className="grid grid-cols-2 gap-3">

              <input
                placeholder="Emp No"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.employeenumber}
                onChange={(e) =>
                  setForm({ ...form, employeenumber: e.target.value })
                }
              />

              <input
                placeholder="First Name"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.firstname}
                onChange={(e) =>
                  setForm({ ...form, firstname: e.target.value })
                }
              />

              <input
                placeholder="Last Name"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.lastname}
                onChange={(e) =>
                  setForm({ ...form, lastname: e.target.value })
                }
              />

              <input
                placeholder="Position"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
              />

              <input
                placeholder="Address"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.telephone}
                onChange={(e) =>
                  setForm({ ...form, telephone: e.target.value })
                }
              />

              <select
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                type="date"
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300"
                value={form.hireddate}
                onChange={(e) =>
                  setForm({ ...form, hireddate: e.target.value })
                }
              />

              <select
                className="border p-2 rounded-2xl bg-gray-50 text-xs border-gray-300 col-span-2"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.departmentName}
                  </option>
                ))}
              </select>

              <button className="col-span-2 bg-gray-900 text-white p-2 rounded-2xl hover:shadow-lg">
                Save Employee
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePage;