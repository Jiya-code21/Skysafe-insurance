import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldAlert,
} from "lucide-react";
import { claimAPI, subscriptionAPI, formatTriggerLabel } from "../api/api.js";

const STATUS_STYLES = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-600 border-red-200",
};

const triggerOptions = ["rain", "aqi", "heat", "curfew", "flood"];

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    subscriptionId: "",
    triggerType: "rain",
    triggerValue: "",
    claimAmount: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const activeSubscriptions = useMemo(
    () => subscriptions.filter((subscription) => subscription.status === "ACTIVE"),
    [subscriptions]
  );

  const selectedSubscription = activeSubscriptions.find(
    (subscription) => subscription.id === form.subscriptionId
  );

  const fetchPageData = async () => {
    setLoading(true);

    try {
      const [claimData, subscriptionData] = await Promise.all([
        claimAPI.getAll(),
        subscriptionAPI.getAll(),
      ]);

      const activeOnly = subscriptionData.filter(
        (subscription) => subscription.status === "ACTIVE"
      );

      setClaims(claimData);
      setSubscriptions(subscriptionData);
      setForm((current) => ({
        ...current,
        subscriptionId: current.subscriptionId || activeOnly[0]?.id || "",
      }));
    } catch (err) {
      setError(err.message || "Could not load claims.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const openModal = () => {
    if (!activeSubscriptions.length) {
      setError("Buy a policy first before filing a claim.");
      return;
    }

    setError("");
    setShowModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.subscriptionId || !form.triggerType || !form.triggerValue || !form.claimAmount) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);

    try {
      await claimAPI.create({
        subscriptionId: form.subscriptionId,
        triggerType: form.triggerType,
        triggerValue: form.triggerValue,
        claimAmount: Number(form.claimAmount),
      });

      setSuccess("Claim filed successfully.");
      setShowModal(false);
      setForm({
        subscriptionId: activeSubscriptions[0]?.id || "",
        triggerType: "rain",
        triggerValue: "",
        claimAmount: "",
      });
      await fetchPageData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Claim filing failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pending claim?")) return;

    try {
      await claimAPI.delete(id);
      setClaims((current) => current.filter((claim) => claim.id !== id));
    } catch (err) {
      setError(err.message || "Unable to delete claim.");
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Claims</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            File and track claims against your active subscriptions.
          </p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={17} /> File Claim
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 size={16} className="shrink-0" />
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : claims.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
            <ShieldAlert size={28} className="text-blue-300" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700">No claims yet</p>
            <p className="text-sm text-slate-400 mt-1">
              File your first claim when a disruption affects your work.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                        STATUS_STYLES[claim.status] || STATUS_STYLES.PENDING
                      }`}
                    >
                      {claim.status}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(claim.createdAt)}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-1 truncate">
                    {claim.policyTitle}
                  </p>
                  <p className="text-xs text-slate-500">
                    {claim.triggerTypeLabel} · {claim.triggerValue}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      Rs {claim.claimAmount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">Claim amount</p>
                  </div>

                  {claim.status === "PENDING" && (
                    <button
                      onClick={() => handleDelete(claim.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-sky-500" />

            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">File a New Claim</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Active Policy
                  </label>
                  <select
                    value={form.subscriptionId}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        subscriptionId: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  >
                    {activeSubscriptions.map((subscription) => (
                      <option key={subscription.id} value={subscription.id}>
                        {subscription.policyTitle} - Rs {subscription.coverageAmount}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Trigger Type
                  </label>
                  <select
                    value={form.triggerType}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        triggerType: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  >
                    {triggerOptions.map((trigger) => (
                      <option key={trigger} value={trigger}>
                        {formatTriggerLabel(trigger)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Trigger Details
                  </label>
                  <textarea
                    value={form.triggerValue}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        triggerValue: e.target.value,
                      }))
                    }
                    placeholder="Example: Heavy rain stopped deliveries in Koramangala"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Claim Amount (max Rs {selectedSubscription?.coverageAmount || 0})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.claimAmount}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        claimAmount: e.target.value,
                      }))
                    }
                    placeholder="e.g. 2000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-200"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Filing...
                      </>
                    ) : (
                      "Submit Claim"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
