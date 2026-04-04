import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { adminAPI } from "../api/api.js";

const STATUS_STYLES = {
  pending:  "bg-yellow-50 text-yellow-700 border-yellow-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-500 border-red-200",
};

const formatDate = (v) =>
  v ? new Date(v).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  }) : "-";

export default function AdminClaims() {
  const [claims, setClaims]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [updating, setUpdating] = useState("");

  const fetchClaims = () => {
    setLoading(true);
    adminAPI.getClaims()
      .then((d) => setClaims(d.claims || []))
      .catch(() => setError("Could not load claims."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClaims(); }, []);

  const handleUpdate = async (id, status) => {
    setUpdating(id + status);
    try {
      await adminAPI.updateClaim(id, status);
      setSuccess(`Claim ${status} successfully.`);
      fetchClaims();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Update failed.");
    } finally {
      setUpdating("");
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">All Claims</h1>
        <p className="text-sm text-slate-500 mt-0.5">Review and manage user claims.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : claims.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <p className="text-slate-400 font-medium">No claims found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {claims.map((claim) => (
            <div key={claim._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">

                  {/* Status + Date */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${STATUS_STYLES[claim.status] || STATUS_STYLES.pending}`}>
                      {claim.status}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(claim.createdAt)}</span>
                  </div>

                  {/* Policy title */}
                  <p className="text-sm font-bold text-slate-800 mb-1">
                    {claim.subscription?.policy?.title || "Policy"}
                  </p>

                  {/* User — ab claim.user se aa raha hai */}
                  <p className="text-xs text-slate-500 mb-0.5">
                    User: <span className="font-semibold">{claim.user?.name || "-"}</span>
                    {claim.user?.email ? ` · ${claim.user.email}` : ""}
                  </p>

                  {/* Trigger */}
                  <p className="text-xs text-slate-500 capitalize">
                    Trigger: <span className="font-semibold">{claim.triggerType}</span>
                    {claim.triggerValue ? ` · ${claim.triggerValue}` : ""}
                  </p>

                  {/* Admin note */}
                  {claim.adminNote && (
                    <p className="text-xs text-slate-400 mt-1 italic">
                      Note: {claim.adminNote}
                    </p>
                  )}
                </div>

                {/* Amount + Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      ₹{claim.claimAmount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">Claim amount</p>
                  </div>

                  {claim.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(claim._id, "approved")}
                        disabled={!!updating}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                      >
                        {updating === claim._id + "approved"
                          ? <Loader2 size={13} className="animate-spin" />
                          : <CheckCircle2 size={13} />}
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdate(claim._id, "rejected")}
                        disabled={!!updating}
                        className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                      >
                        {updating === claim._id + "rejected"
                          ? <Loader2 size={13} className="animate-spin" />
                          : <X size={13} />}
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}