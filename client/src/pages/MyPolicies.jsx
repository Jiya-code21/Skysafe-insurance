import React, { useEffect, useState } from "react";
import { Shield, Plus, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { subscriptionAPI } from "../api/api.js";
import PolicyCard from "../components/PolicyCard.jsx";

export default function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await subscriptionAPI.getAll();
        setPolicies(data);
      } catch (err) {
        setError(err.message || "Could not load policies.");
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Policies</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View and manage your active coverage plans.
          </p>
        </div>
        <Link
          to="/policy/buy"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200"
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

      /* Empty state */
      ) : policies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Shield size={28} className="text-blue-300" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700">No policies yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Buy your first policy to start protecting your income.
            </p>
          </div>
          <Link
            to="/policy/buy"
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

      /* Policies grid */
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      )}
    </div>
  );
}