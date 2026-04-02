import React, { useEffect, useState } from "react";
import {
  Shield,
  CloudRain,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Loader2,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscriptionAPI, claimAPI, weatherAPI } from "../api/api.js";

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
  const [subscriptions, setSubscriptions] = useState([]);
  const [claims, setClaims] = useState([]);
  const [weatherMsg, setWeatherMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [subscriptionData, claimData] = await Promise.all([
          subscriptionAPI.getAll(),
          claimAPI.getAll(),
        ]);

        setSubscriptions(subscriptionData);
        setClaims(claimData);

        if (user?.location) {
          try {
            const weather = await weatherAPI.checkRain(user.location);
            if (!weather.monitoringUnavailable) {
              setWeatherMsg(weather.message || "");
            }
          } catch {
            setWeatherMsg("");
          }
        }
      } catch {
        setSubscriptions([]);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "ACTIVE"
  );
  const activePolicy = activeSubscriptions[0];
  const pendingClaims = claims.filter((claim) => claim.status === "PENDING").length;
  const totalCoverage = activeSubscriptions.reduce(
    (sum, subscription) => sum + (subscription.coverageAmount || 0),
    0
  );

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
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
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-200">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-8 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium mb-1">{greeting()},</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user?.name || "User"}</h1>
          <p className="text-blue-100 text-sm">
            {activePolicy
              ? `Your ${activePolicy.policyTitle} is protecting Rs ${activePolicy.coverageAmount?.toLocaleString()} this week.`
              : "You do not have an active policy yet. Buy one to start protection."}
          </p>
        </div>

        {weatherMsg.includes("Rain") && (
          <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 w-fit">
            <CloudRain size={16} />
            <span className="text-sm font-semibold">{weatherMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Shield}
          label="Active Policies"
          value={activeSubscriptions.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={ShieldCheck}
          label="Total Coverage"
          value={`Rs ${totalCoverage.toLocaleString()}`}
          color="bg-sky-500"
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Claims"
          value={pendingClaims}
          color="bg-orange-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Claims"
          value={claims.length}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Current Policy</h2>
            <Link
              to="/policy"
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View all {"->"}
            </Link>
          </div>

          {activePolicy ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full mr-2">
                      Active
                    </span>
                    {activePolicy.policyTitle}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{activePolicy.planLabel}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Weekly Premium</p>
                  <p className="text-xl font-bold text-slate-800">Rs {activePolicy.weeklyPremium}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Coverage</p>
                  <p className="text-xl font-bold text-blue-600">
                    Rs {activePolicy.coverageAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Shield size={24} className="text-blue-400" />
              </div>
              <p className="text-sm text-slate-500 text-center">
                No active policy yet.
                <br />
                Start protecting your income.
              </p>
              <Link
                to="/policy/buy"
                className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Buy Policy
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Recent Claims</h2>
            <Link
              to="/claims"
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View all {"->"}
            </Link>
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
              {claims.slice(0, 3).map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-700 truncate max-w-[170px]">
                      {claim.policyTitle}
                    </p>
                    <p className="text-xs text-slate-400">
                      {claim.triggerTypeLabel} · Rs {claim.claimAmount}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                      claim.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : claim.status === "APPROVED"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {claim.status}
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
