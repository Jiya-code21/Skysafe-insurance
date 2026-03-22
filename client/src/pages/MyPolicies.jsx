import React, { useEffect, useState } from 'react';
import { Shield, ShieldCheck, Plus, Loader2, CalendarRange, AlertCircle } from 'lucide-react';
import { policyAPI } from '../api/api.js';
import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  ACTIVE:   'bg-green-50 text-green-700 border-green-200',
  INACTIVE: 'bg-slate-100 text-slate-500 border-slate-200',
  EXPIRED:  'bg-red-50 text-red-500 border-red-200',
};

export default function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    policyAPI.getAll()
      .then(setPolicies)
      .catch(() => setError('Could not load policies. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Policies</h1>
          <p className="text-sm text-slate-500 mt-0.5">View and manage your coverage plans</p>
        </div>
        <Link
          to="/policy/buy"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={17} /> Buy Policy
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : policies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Shield size={28} className="text-blue-300" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700">No policies yet</p>
            <p className="text-sm text-slate-400 mt-1">Buy your first policy to start protecting your income.</p>
          </div>
          <Link
            to="/policy/buy"
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                  <ShieldCheck size={22} className="text-white" />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                    STATUS_STYLES[policy.status] || STATUS_STYLES.INACTIVE
                  }`}
                >
                  {policy.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-1">Income Protection Plan</h3>
              <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                <CalendarRange size={12} /> Weekly coverage
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Weekly Premium</p>
                  <p className="text-xl font-bold text-slate-800">â‚¹{policy.weeklyPremium}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Max Coverage</p>
                  <p className="text-xl font-bold text-blue-600">â‚¹{policy.coverageAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
