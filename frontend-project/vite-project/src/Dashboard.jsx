import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  User,
  CreditCard,
  BarChart3,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("user"));
    setUser(exist);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-white text-slate-900 font-semibold shadow"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <div className="w-full min-h-screen flex bg-slate-100 font-sans">

      {/* SIDEBAR */}
      <aside className="w-[260px] h-screen flex flex-col bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white shadow-2xl">

        {/* BRAND */}
        <div className="p-5 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wide">EPMS</h1>
          <p className="text-xs text-emerald-200 mt-1">
            Payroll Management System
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2">

          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/department" className={linkClass}>
            <Layers size={18} />
            Departments
          </NavLink>

          <NavLink to="/dashboard/employee" className={linkClass}>
            <User size={18} />
            Employees
          </NavLink>

          <NavLink to="/dashboard/salary" className={linkClass}>
            <CreditCard size={18} />
            Salary
          </NavLink>

          <NavLink to="/dashboard/report" className={linkClass}>
            <BarChart3 size={18} />
            Reports
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-white py-2 rounded-xl transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col w-full h-screen overflow-hidden">

        {/* HEADER */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold text-slate-800">
            Welcome back 👋
          </h1>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full shadow-lg">

            <div className="text-right">
              <h2 className="text-sm font-semibold text-slate-700">
                {user?.name || "User"}
              </h2>
              <p className="text-xs text-emerald-600">
                Active Account
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <User size={18} className="text-emerald-700" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className=" overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;