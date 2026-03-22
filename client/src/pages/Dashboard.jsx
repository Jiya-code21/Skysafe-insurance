import React, { useEffect, useState } from "react";
import { Shield, CloudRain, ShieldCheck, TrendingUp, AlertCircle, Plus, Loader2, CalendarRange, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { policyAPI, claimAPI, weatherAPI } from "../api/api.js";
import { Link } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <p className="text-sm font-semibold text-slate-500 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [weatherMsg, setWeatherMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pol, clm] = await Promise.all([policyAPI.getAll(), claimAPI.getAll()]);
        setPolicies(pol);
        setClaims(clm);
        // Check weather for user location
        if (user?.location) {
          try {
            const w = await weatherAPI.checkRain(user.location);
            setWeatherMsg(w.message);
          } catch (_) {}
        }
      } catch (_) {}
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  const activePolicy = policies.find((p) => p.status === "ACTIVE");
  const pendingClaims = claims.filter((c) => c.status === "PENDING").length;
  const totalCoverage = policies.reduce((sum, p) => sum + (p.coverageAmount || 0), 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-6">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-200">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-8 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium mb-1">{greeting()},</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user?.name || "User"} 👋</h1>
          <p className="text-blue-100 text-sm">
            {activePolicy
              ? `Your ${activePolicy.status.toLowerCase()} policy is protecting ₹${activePolicy.coverageAmount?.toLocaleString()}`
              : "You have no active policy. Stay protected!"}
          </p>
        </div>
        {/* Weather Alert */}
        {weatherMsg && weatherMsg.includes("Rain") && (
          <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 w-fit">
            <CloudRain size={16} />
            <span className="text-sm font-semibold">Rain detected in {user?.location} — Claim may be triggered!</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Active Policies" value={policies.filter(p => p.status === "ACTIVE").length} color="bg-blue-500" />
        <StatCard icon={ShieldCheck} label="Total Coverage" value={`₹${totalCoverage.toLocaleString()}`} color="bg-sky-500" />
        <StatCard icon={AlertCircle} label="Pending Claims" value={pendingClaims} color="bg-orange-400" />
        <StatCard icon={TrendingUp} label="Total Claims" value={claims.length} color="bg-emerald-500" />
      </div>

      {/* Active Policy Card */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Current Policy</h2>
            <Link to="/policy" className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">View all →</Link>
          </div>
          {activePolicy ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {activePolicy.status === "ACTIVE" && (
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full mr-2">
                        ● Active
                      </span>
                    )}
                    Full Coverage
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Weekly premium plan</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Weekly Premium</p>
                  <p className="text-xl font-bold text-slate-800">₹{activePolicy.weeklyPremium}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Coverage</p>
                  <p className="text-xl font-bold text-blue-600">₹{activePolicy.coverageAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Shield size={24} className="text-blue-400" />
              </div>
              <p className="text-sm text-slate-500 text-center">No active policy yet.<br />Start protecting your income.</p>
              <Link to="/policy" className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                Buy Policy
              </Link>
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Recent Claims</h2>
            <Link to="/claims" className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">View all →</Link>
          </div>
          {claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                <BarChart3 size={24} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 text-center">No claims filed yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {claims.slice(0, 3).map((c) => (
                <div key={c._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 truncate max-w-[130px]">{c.reason}</p>
                    <p className="text-xs text-slate-400">₹{c.payout} payout</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                    c.status === "PENDING" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    c.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" :
                    "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
