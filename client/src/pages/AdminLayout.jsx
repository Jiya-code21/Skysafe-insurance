import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Shield,
  LogOut, ChevronLeft, ChevronRight, Menu
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/users",     icon: Users,            label: "Users" },
  { path: "/admin/claims",    icon: FileText,         label: "Claims" },
  { path: "/admin/policies",  icon: Shield,           label: "Policies" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-slate-900 flex flex-col transition-all duration-300 relative shrink-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Shield size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-sm">SkySafe</p>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}>
                <Icon size={18} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-slate-700">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-600 hover:text-white transition-all text-sm font-medium w-full">
            <LogOut size={18} className="shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(p => !p)}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-md">
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
          <p className="text-sm text-slate-500">
            Welcome back, <span className="font-bold text-slate-800">{user?.name}</span>
          </p>
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-200">
            {user?.initials || "A"}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}