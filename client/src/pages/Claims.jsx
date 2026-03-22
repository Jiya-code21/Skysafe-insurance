// import React from 'react';
// import { CheckCircle2, Zap, BrainCircuit, Activity } from 'lucide-react';

// const claimsData = [
//   {
//     id: 'CLM-9091',
//     date: '15 Mar 2026',
//     trigger: 'Extreme Heat Alert (45°C+)',
//     amount: '₹500',
//     status: 'Instant Payout Processed',
//   },
//   {
//     id: 'CLM-8442',
//     date: '02 Feb 2026',
//     trigger: 'Heavy Rain / Flooding',
//     amount: '₹850',
//     status: 'Instant Payout Processed',
//   },
//   {
//     id: 'CLM-8110',
//     date: '12 Jan 2026',
//     trigger: 'Local Curfew / Road Block',
//     amount: '₹400',
//     status: 'AI Validation',
//   }
// ];

// const Claims = () => {
//   return (
//     <div className="flex flex-col gap-8 pb-20 max-w-4xl mx-auto w-full">
//       <div className="border-b border-white/10 pb-4">
//         <h1 className="text-4xl font-bold tracking-tight text-white">Automated Claims</h1>
//         <p className="text-sm font-medium text-white/50 mt-1">Zero-Touch resolution timeline.</p>
//       </div>

//       <div className="bg-brand-blue/10 text-white glass-card p-8 flex items-center gap-6 border-brand-blue/30 shadow-sm relative overflow-hidden">
//         <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-blue/30 rounded-full blur-[60px] pointer-events-none"></div>
//         <Zap size={48} className="text-brand-blue" />
//         <div className="relative z-10">
//           <h2 className="text-2xl font-bold text-white mb-1">Instant Parametric Payouts</h2>
//           <p className="font-medium text-white/60">Our system automatically validates external data sources. When a trigger condition is met in your active zone, funds are instantly credited to cover your lost daily wages.</p>
//         </div>
//       </div>

//       <div className="flex flex-col gap-6">
//         {claimsData.map((claim, idx) => (
//           <div key={claim.id} className="glass-card p-6 border-l-4 border-l-brand-blue">
            
//             <div className="flex justify-between items-start mb-8">
//               <div>
//                 <span className="bg-white/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide border border-brand-blue/20">{claim.date}</span>
//                 <h3 className="text-xl font-bold text-white mt-3">{claim.trigger}</h3>
//                 <p className="text-white/40 font-medium text-sm mt-1">Ref ID: {claim.id}</p>
//               </div>
//               <div className="text-2xl font-display font-bold text-brand-darkBlue">+{claim.amount}</div>
//             </div>

//             {/* Glowing Timeline progress */}
//             <div className="relative pt-4">
//               <div className="absolute top-6 left-0 w-full h-[2px] bg-white/10 z-0"></div>
              
//               <div className="flex justify-between relative z-10">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="w-6 h-6 rounded-full bg-brand-blue border-2 border-dark-bg flex items-center justify-center shadow-sm">
//                     <Activity size={12} className="text-white" />
//                   </div>
//                   <span className="text-xs font-semibold uppercase text-brand-blue tracking-wider text-center max-w-[100px]">Disruption Detected</span>
//                 </div>
                
//                 <div className="flex flex-col items-center gap-3">
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark-bg transition-colors ${claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'bg-brand-blue shadow-sm' : 'bg-white/20'}`}>
//                     <BrainCircuit size={12} className={claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'text-white' : 'text-white/50'} />
//                   </div>
//                   <span className={`text-xs font-semibold uppercase tracking-wider text-center max-w-[100px] ${claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'text-brand-blue' : 'text-white/30'}`}>AI Validation</span>
//                 </div>
                
//                 <div className="flex flex-col items-center gap-3">
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark-bg transition-colors ${claim.status === 'Instant Payout Processed' ? 'bg-brand-blue shadow-sm' : 'bg-white/20'}`}>
//                     {claim.status === 'Instant Payout Processed' && <CheckCircle2 size={12} className="text-black" />}
//                   </div>
//                   <span className={`text-xs font-semibold uppercase tracking-wider text-center max-w-[100px] ${claim.status === 'Instant Payout Processed' ? 'text-brand-blue' : 'text-white/30'}`}>Instant Payout Processed</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Claims;
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, AlertCircle, CheckCircle2, X, ShieldAlert } from "lucide-react";
import { claimAPI } from "../api/api.js";

const STATUS_STYLES = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-600 border-red-200",
};

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ policyId: "", reason: "", payout: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const data = await claimAPI.getAll();
      setClaims(data);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { fetchClaims(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.policyId || !form.reason || !form.payout) {
      setError("All fields are required."); return;
    }
    setSubmitting(true);
    try {
      await claimAPI.create({ policyId: form.policyId, reason: form.reason, payout: Number(form.payout) });
      setSuccess("Claim filed successfully!");
      setShowModal(false);
      setForm({ policyId: "", reason: "", payout: "" });
      fetchClaims();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this claim?")) return;
    try {
      await claimAPI.delete(id);
      setClaims((p) => p.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Claims</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and manage your insurance claims</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setError(""); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={17} /> File Claim
        </button>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 size={16} className="shrink-0" />
          {success}
        </div>
      )}

      {/* Claims List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : claims.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
            <ShieldAlert size={28} className="text-blue-300" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700">No claims yet</p>
            <p className="text-sm text-slate-400 mt-1">File your first claim when a disruption occurs.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {claims.map((claim) => (
            <div key={claim._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${STATUS_STYLES[claim.status] || STATUS_STYLES.PENDING}`}>
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-1 truncate">{claim.reason}</p>
                  <p className="text-xs text-slate-400">Policy ID: {claim.policyId}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">â‚¹{claim.payout?.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Payout</p>
                  </div>
                  <button
                    onClick={() => handleDelete(claim._id)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-sky-500" />
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">File a New Claim</h2>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={18} />
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                  <AlertCircle size={15} className="shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Policy ID</label>
                  <input
                    type="text"
                    value={form.policyId}
                    onChange={(e) => setForm((p) => ({ ...p, policyId: e.target.value }))}
                    placeholder="Enter your policy ID"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason</label>
                  <textarea
                    value={form.reason}
                    onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                    placeholder="Describe the disruption or reason..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Payout Amount (â‚¹)</label>
                  <input
                    type="number"
                    value={form.payout}
                    onChange={(e) => setForm((p) => ({ ...p, payout: e.target.value }))}
                    placeholder="e.g. 2000"
                    min={0}
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
                    {submitting ? <><Loader2 size={16} className="animate-spin" /> Filing...</> : "Submit Claim"}
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

