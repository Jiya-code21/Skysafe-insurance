import React, { useEffect, useState } from "react";
import {
  Users, ShieldCheck, AlertCircle, TrendingUp,
  IndianRupee, Loader2, CheckCircle2, Clock
} from "lucide-react";
import { adminAPI } from "../api/api.js";

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
      <Icon size={20} className="text-white" />
    </div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <p className="text-sm font-semibold text-slate-500 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </div>
);

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  }) : "-";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminAPI.getDashboard()
      .then(setData)
      .catch(() => setError("Could not load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
      <AlertCircle size={16} /> {error}
    </div>
  );

  const { stats, recentUsers, recentClaims } = data;

  return (
    <div className="space-y-7 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform overview and recent activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Users}        label="Total Users"      value={stats.totalUsers}    color="bg-blue-500" />
        <StatCard icon={ShieldCheck}  label="Active Policies"  value={stats.activeSubs}    color="bg-emerald-500" />
        <StatCard icon={Clock}        label="Pending Claims"   value={stats.pendingClaims} color="bg-orange-400" />
        <StatCard icon={CheckCircle2} label="Approved Claims"  value={stats.approvedClaims} color="bg-sky-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={IndianRupee}
          label="Total Revenue"
          value={`₹${stats.totalRevenue?.toLocaleString()}`}
          color="bg-violet-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Payouts"
          value={`₹${stats.totalPayout?.toLocaleString()}`}
          color="bg-rose-400"
        />
      </div>

      {/* Recent Users + Claims */}
      <div className="grid sm:grid-cols-2 gap-5">

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4">Recent Users</h2>
          {recentUsers?.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No users yet.</p>
          ) : (
            <div className="space-y-3">
              {recentUsers?.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      user.isActive
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-500 border-red-200"
                    }`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4">Recent Claims</h2>
          {recentClaims?.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No claims yet.</p>
          ) : (
            <div className="space-y-3">
              {recentClaims?.map((claim) => (
                <div key={claim._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 capitalize">{claim.triggerType}</p>
                    <p className="text-xs text-slate-400">{formatDate(claim.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">₹{claim.claimAmount?.toLocaleString()}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      claim.status === "pending"   ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      claim.status === "approved"  ? "bg-green-50 text-green-700 border-green-200" :
                                                     "bg-red-50 text-red-500 border-red-200"
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}