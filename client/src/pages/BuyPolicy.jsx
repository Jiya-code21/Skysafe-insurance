import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { policyAPI, subscriptionAPI } from "../api/api.js";

const triggerLabels = {
  rain: "Heavy rain",
  aqi: "Poor AQI",
  heat: "Heat wave",
  curfew: "Curfew",
  flood: "Flood alert",
};

export default function BuyPolicy() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await policyAPI.getCatalog();
        setPlans(data);
        if (data.length) {
          setSelected(data[0].id);
        }
      } catch (err) {
        setError(err.message || "Could not load plans.");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const selectedPlan = plans.find((plan) => plan.id === selected);

  const handleBuy = async () => {
    if (!selectedPlan) return;

    setError("");
    setLoading(true);

    try {
      await subscriptionAPI.buy({ policyId: selectedPlan.id });
      setSuccess("Policy purchased successfully. Redirecting...");
      setTimeout(() => navigate("/policy"), 1500);
    } catch (err) {
      setError(err.message || "Purchase failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPlans) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={30} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/policy")}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Buy a Policy</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Choose the weekly protection plan that fits your work style.
          </p>
        </div>
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

      {!plans.length ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
          <p className="text-slate-600 font-semibold">No plans available right now.</p>
          <Link
            to="/dashboard"
            className="inline-flex mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`text-left w-full rounded-2xl border-2 p-5 transition-all relative ${
                  selected === plan.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
              >
                {plan.planType === "standard" && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide bg-blue-600 text-white px-2.5 py-1 rounded-full">
                    Recommended
                  </span>
                )}

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        selected === plan.id ? "text-blue-700" : "text-slate-800"
                      }`}
                    >
                      {plan.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5 max-w-xl">
                      {plan.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-slate-800">
                      Rs {plan.weeklyPremium}
                      <span className="text-sm font-normal text-slate-400">/wk</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Up to Rs {plan.coverageAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2 mt-3">
                  {plan.triggerTypes.map((trigger) => (
                    <li
                      key={trigger}
                      className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-100 rounded-full px-3 py-1"
                    >
                      <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                      {triggerLabels[trigger] || trigger}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Selected: {selectedPlan?.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Rs {selectedPlan?.weeklyPremium}/week · Coverage up to Rs{" "}
                  {selectedPlan?.coverageAmount?.toLocaleString()}
                </p>
              </div>
              <ShieldCheck size={28} className="text-blue-500" />
            </div>

            <button
              onClick={handleBuy}
              disabled={loading || !selectedPlan}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-200"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>Confirm Purchase - Rs {selectedPlan?.weeklyPremium}/wk</>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
