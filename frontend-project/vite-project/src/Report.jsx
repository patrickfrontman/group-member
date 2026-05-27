import React, { useEffect, useState } from "react";
import { Download, Wallet, Users, BadgeDollarSign } from "lucide-react";

function SalaryReport() {
  const [salaries, setSalaries] = useState([]);

  const token = localStorage.getItem("token");

  // Load salaries
  useEffect(() => {
    const loadSalaries = async () => {
      try {
        const res = await fetch("http://localhost:5000/salaries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSalaries(data.salaries || []);
      } catch (err) {
        console.log("Failed to load salaries", err.message);
      }
    };

    loadSalaries();
  }, [token]);

  // Export CSV
  const exportCSV = () => {
    const header = [
      "Employee",
      "Department",
      "Gross Salary",
      "Deduction",
      "Net Salary",
      "Month",
    ];

    const rows = salaries.map((s) => [
      `${s.employee?.firstname || ""} ${s.employee?.lastname || ""}`,
      s.employee?.department?.departmentName || "",
      s.GrossSalary,
      s.TotalDeduction,
      s.NetSalary,
      s.month,
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "salary-report.csv";
    a.click();
  };

  // Totals
  const totalGross = salaries.reduce((a, b) => a + Number(b.GrossSalary || 0), 0);
  const totalDeduction = salaries.reduce((a, b) => a + Number(b.TotalDeduction || 0), 0);
  const totalNet = salaries.reduce((a, b) => a + Number(b.NetSalary || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salary Report</h1>
          <p className="text-gray-500 text-sm">Employee salary overview</p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl hover:shadow-lg duration-500 transition-all">
          <p className="text-gray-500 text-sm">Gross Salary</p>
          <h2 className="text-xl font-bold">${totalGross}</h2>
          <Wallet className="text-blue-500 mt-2" />
        </div>

        <div className="bg-white p-4 rounded-xl hover:shadow-lg duration-500 transition-all">
          <p className="text-gray-500 text-sm">Total Deduction</p>
          <h2 className="text-xl font-bold text-red-500">${totalDeduction}</h2>
          <BadgeDollarSign className="text-red-500 mt-2" />
        </div>

        <div className="bg-white p-4 rounded-xl hover:shadow-lg duration-500 transition-all">
          <p className="text-gray-500 text-sm">Net Salary</p>
          <h2 className="text-xl font-bold text-green-600">${totalNet}</h2>
          <Users className="text-green-600 mt-2" />
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Department</th>
              <th className="p-3 text-center">Gross</th>
              <th className="p-3 text-center">Deduction</th>
              <th className="p-3 text-center">Net</th>
              <th className="p-3 text-center">Month</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((s) => (
              <tr key={s._id} className="border-b border-gray-300">
                <td className="p-3">
                  {s.employee?.firstname} {s.employee?.lastname}
                </td>

                <td className="p-3">
                  {s.employee?.department?.departmentName}
                </td>

                <td className="p-3 text-center">${s.GrossSalary}</td>
                <td className="p-3 text-center text-red-500">${s.TotalDeduction}</td>
                <td className="p-3 text-center text-green-600">${s.NetSalary}</td>

                <td className="p-3 text-center">{s.month}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default SalaryReport;