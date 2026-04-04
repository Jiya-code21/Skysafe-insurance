import React, { useEffect, useState } from "react";
import { Shield, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { adminAPI } from "../api/api.js";

const formatDate = (v) =>
  v ? new Date(v).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  }) : "-";

const planColors = {
  basic:    "bg-slate-100 text-slate-600 border-slate-200",
  standard: "bg-blue-50 text-blue-700 border-blue-200",
  pro:      "bg-amber-50 text-amber-700 border-amber-200",
  premium:  "bg-purple-50 text-purple-700 border-purple-200",
};

const triggerLabels = {
  rain: "Heavy Rain", aqi: "Poor AQI",
  heat: "Heat Wave", curfew: "Curfew", flood: "Flood",
};

export default function AdminPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    adminAPI.getPolicies()
      .then((d) => setPolicies(d.policies || []))
      .catch(() => setError("Could not load policies."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">All Policies</h1>
        <p className="text-sm text-slate-500 mt-0.5">View all available insurance policies.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : policies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <p className="text-slate-400">No policies found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <div key={policy._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                  <Shield size={18} className="text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    planColors[policy.planType] || planColors.basic
                  }`}>
                    {policy.planType}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    policy.isActive
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-500 border-red-200"
                  }`}>
                    {policy.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-800 mb-1">{policy.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{policy.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">Weekly Premium</p>
                  <p className="text-lg font-bold text-slate-800">₹{policy.price}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-slate-400 mb-0.5">Max Coverage</p>
                  <p className="text-lg font-bold text-blue-600">
                    ₹{policy.coverageAmount?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Triggers */}
              {policy.triggerTypes?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {policy.triggerTypes.map((t) => (
                    <span key={t} className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
                      <CheckCircle2 size={10} className="text-blue-500" />
                      {triggerLabels[t] || t}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-slate-100 pt-3 text-xs text-slate-400">
                Duration: <span className="font-semibold text-slate-600">{policy.duration} days</span>
                {" · "}Created: {formatDate(policy.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}