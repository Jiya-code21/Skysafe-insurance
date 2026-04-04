import React from "react";
import { ShieldCheck, CalendarRange, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const triggerLabels = {
  rain: "Heavy Rain",
  aqi: "Poor AQI",
  heat: "Heat Wave",
  curfew: "Curfew",
  flood: "Flood Alert",
};

const STATUS_STYLES = {
  ACTIVE: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
  EXPIRED: "bg-red-50 text-red-500 border-red-200",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

export default function PolicyCard({ policy }) {
  if (!policy) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
          <ShieldCheck size={22} className="text-white" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
          STATUS_STYLES[policy.status] || STATUS_STYLES.CANCELLED
        }`}>
          {policy.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-800 mb-1">{policy.policyTitle}</h3>
      <p className="text-xs text-slate-400 mb-1 font-medium">{policy.planLabel}</p>
      <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
        <CalendarRange size={12} />
        {formatDate(policy.startDate)} → {formatDate(policy.endDate)}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-400 font-medium mb-0.5">Weekly Premium</p>
          <p className="text-xl font-bold text-slate-800">₹{policy.weeklyPremium}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
          <p className="text-xs text-slate-400 font-medium mb-0.5">Max Coverage</p>
          <p className="text-xl font-bold text-blue-600">
            ₹{policy.coverageAmount?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Triggers */}
      {policy.triggerTypes?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {policy.triggerTypes.map((t) => (
            <span key={t}
              className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
              <CheckCircle2 size={11} className="text-blue-500" />
              {triggerLabels[t] || t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Duration: <span className="font-semibold text-slate-600">{policy.duration} days</span>
        </p>
        {policy.status === "ACTIVE" && (
          <Link to="/claims"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            File Claim →
          </Link>
        )}
      </div>
    </div>
  );
}