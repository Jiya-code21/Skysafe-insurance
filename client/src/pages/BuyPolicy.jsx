import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { policyAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    weeklyPremium: 90,
    coverageAmount: 3000,
    desc: 'Covers extreme events only. Ideal for part-time workers.',
    features: ['Extreme weather coverage', 'Basic claim support'],
  },
  {
    id: 'standard',
    name: 'Standard',
    weeklyPremium: 150,
    coverageAmount: 5000,
    desc: 'Recommended for daily riders and full-time gig workers.',
    features: ['All weather events', 'Instant parametric payouts', 'Priority support'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    weeklyPremium: 240,
    coverageAmount: 8000,
    desc: 'Maximum protection for full-time professionals.',
    features: ['All Standard features', 'Curfew & disruption cover', 'Dedicated claims manager'],
  },
];

export default function BuyPolicy() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('standard');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const selectedPlan = plans.find((p) => p.id === selected);

  const handleBuy = async () => {
    setError('');
    setLoading(true);
    try {
      await policyAPI.buy({
        weeklyPremium:  selectedPlan.weeklyPremium,
        coverageAmount: selectedPlan.coverageAmount,
      });
      setSuccess('Policy purchased successfully! Redirecting…');
      setTimeout(() => navigate('/policy'), 2000);
    } catch (err) {
      setError(err.message || 'Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/policy')}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Buy a Policy</h1>
          <p className="text-sm text-slate-500 mt-0.5">Choose the plan that fits your work style</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 size={16} className="shrink-0" /> {success}
        </div>
      )}

      {/* Plans */}
      <div className="grid gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`text-left w-full rounded-2xl border-2 p-5 transition-all relative ${
              selected === plan.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-blue-200'
            }`}
          >
            {plan.recommended && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide bg-blue-600 text-white px-2.5 py-1 rounded-full">
                Recommended
              </span>
            )}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`text-lg font-bold ${selected === plan.id ? 'text-blue-700' : 'text-slate-800'}`}>
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 max-w-xs">{plan.desc}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  ₹{plan.weeklyPremium}
                  <span className="text-sm font-normal text-slate-400">/wk</span>
                </p>
                <p className="text-xs text-slate-400">Up to ₹{plan.coverageAmount.toLocaleString()}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 mt-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-100 rounded-full px-3 py-1">
                  <CheckCircle2 size={12} className="text-blue-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Summary + CTA */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Selected: {selectedPlan?.name} Plan</p>
            <p className="text-xs text-slate-400 mt-0.5">
              ₹{selectedPlan?.weeklyPremium}/week · Coverage up to ₹{selectedPlan?.coverageAmount?.toLocaleString()}
            </p>
          </div>
          <ShieldCheck size={28} className="text-blue-500" />
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-200"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Processing…</>
          ) : (
            <>Confirm Purchase — ₹{selectedPlan?.weeklyPremium}/wk</>
          )}
        </button>
      </div>
    </div>
  );
}
