import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Shield, LayoutDashboard, Users,
  FileText, ScrollText, LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/users",     icon: Users,            label: "Users"     },
  { path: "/admin/claims",    icon: FileText,         label: "Claims"    },
  { path: "/admin/policies",  icon: ScrollText,       label: "Policies"  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0 relative`}>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md z-10 hover:bg-blue-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
            <Shield size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-sm leading-none">SkySafe</p>
              <p className="text-blue-400 text-xs font-semibold">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-5 px-2 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink key={path} to={path} end={path === "/admin/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-slate-700 space-y-1">
          {!collapsed && (
            <div className="px-3 py-2 mb-1 bg-slate-800 rounded-xl">
              <p className="text-white text-xs font-bold truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                ADMIN
              </span>
            </div>
          )}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">
            Welcome back, <span className="text-slate-800 font-bold">{user?.name}</span>
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {user?.initials || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}