import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, Eye, EyeOff, AlertCircle, ArrowRight,
  Loader2, CheckCircle2, Zap, CloudRain, TrendingUp
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage, validateLoginForm } from "../utils/authValidation";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .login-root { font-family: 'DM Sans', sans-serif; }
  .font-sora  { font-family: 'Sora', sans-serif; }

  @keyframes float-card {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-14px) rotate(1deg); }
  }
  @keyframes float-card2 {
    0%, 100% { transform: translateY(0px) rotate(1deg); }
    50%       { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes blob {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { box-shadow: 0 0 0 16px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes check-pop {
    0%  { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); }
    100%{ transform: scale(1); opacity: 1; }
  }

  .float-1  { animation: float-card  6s ease-in-out infinite; }
  .float-2  { animation: float-card2 8s ease-in-out infinite 1s; }
  .blob-bg  { animation: blob 12s ease-in-out infinite; }
  .blob-bg2 { animation: blob 16s ease-in-out infinite reverse; }

  .anim-left  { animation: slide-in-left  0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-right { animation: slide-in-right 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-up    { animation: fade-up 0.5s ease both; }
  .anim-up-1  { animation: fade-up 0.5s ease 0.1s both; }
  .anim-up-2  { animation: fade-up 0.5s ease 0.2s both; }
  .anim-up-3  { animation: fade-up 0.5s ease 0.3s both; }
  .anim-up-4  { animation: fade-up 0.5s ease 0.4s both; }

  .shimmer-text {
    background: linear-gradient(90deg,#1d4ed8,#3b82f6,#0ea5e9,#3b82f6,#1d4ed8);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .glass {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.9);
  }

  .input-field {
    transition: all 0.2s ease;
  }
  .input-field:focus {
    background: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
  }

  .btn-submit {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .btn-submit:hover::after { opacity: 1; }
  .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 32px -6px rgba(37,99,235,0.5); }
  .btn-submit:active:not(:disabled) { transform: translateY(0); }

  .pulse-logo { animation: pulse-ring 2.5s ease-in-out infinite; }

  .feature-item {
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .feature-item:hover { transform: translateX(4px); background: rgba(255,255,255,0.15); }
`;

const features = [
  { icon: Zap,        text: "Instant parametric payouts",         sub: "Under 2 minutes" },
  { icon: CloudRain,  text: "Rain & heat wave protection",        sub: "Auto-triggered" },
  { icon: TrendingUp, text: "Up to ₹8,000 weekly coverage",       sub: "No forms needed" },
  { icon: CheckCircle2,text:"Trusted by 2,400+ gig workers",      sub: "4.9★ rating" },
];

export default function Login() {
  const navigate    = useNavigate();
  const { login }   = useAuth();
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const getInputClass = (field) =>
    `input-field w-full px-4 py-3.5 rounded-xl border bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none ${
      fieldErrors[field] ? "border-red-300 bg-red-50/60" : "border-slate-200"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateLoginForm(form);

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err, "Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root min-h-screen flex bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">

        {/* ══════════════════════════════
            LEFT PANEL — Branding
        ══════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[52%] relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">

          {/* Animated blobs */}
          <div className="blob-bg  absolute top-10 left-10  w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          <div className="blob-bg2 absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />

          <div className="relative z-10 max-w-sm w-full">
            {/* Logo */}
            <div className="anim-left flex items-center gap-3 mb-14">
              <div className="pulse-logo w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                <Shield size={24} className="text-white" />
              </div>
              <span className="font-sora text-2xl font-bold text-white">
                Sky<span className="text-blue-200">Safe</span>
              </span>
            </div>

            {/* Headline */}
            <div className="anim-left mb-10">
              <h2 className="font-sora text-4xl font-extrabold text-white leading-tight mb-4">
                Welcome back,<br />
                <span className="text-blue-200">let's get you</span><br />
                protected. 🛡️
              </h2>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                Log in to check your coverage, view payouts, and manage your income protection plan.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3 mb-12">
              {features.map(({ icon: Icon, text, sub }, i) => (
                <div
                  key={text}
                  className="feature-item flex items-center gap-4 px-4 py-3 rounded-2xl border border-white/10 cursor-default"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{text}</p>
                    <p className="text-blue-200/70 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating payout card */}
            <div className="float-1 glass rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl border-white/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
                <TrendingUp size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 text-xs font-medium">Latest Payout</p>
                <p className="text-slate-900 text-base font-bold">₹1,200 credited</p>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full">Paid ✓</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT PANEL — Form
        ══════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center p-6 relative">

          {/* bg blobs */}
          <div className="fixed top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-72 h-72 bg-sky-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

          <div className="anim-right w-full max-w-md relative z-10">

            {/* Mobile logo */}
            <div className="anim-up lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                <Shield size={20} className="text-white" />
              </div>
              <span className="font-sora text-xl font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/60 border border-slate-100 overflow-hidden">

              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

              <div className="p-8 sm:p-10">
                <div className="anim-up mb-7">
                  <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-1">Sign in to your account</h1>
                  <p className="text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors underline-offset-2 hover:underline">
                      Sign up free →
                    </Link>
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="anim-up flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Email */}
                  <div className="anim-up-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={getInputClass("email")}
                    />
                    {fieldErrors.email && (
                      <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="anim-up-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-700">Password</label>
                      <Link to="/forgot-password" className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`${getInputClass("password")} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(p => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.password}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="anim-up-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-submit w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 text-sm mt-1"
                    >
                      {loading ? (
                        <><Loader2 size={18} className="animate-spin" /> Signing in...</>
                      ) : (
                        <><Shield size={17} /> Sign In to SkySafe <ArrowRight size={17} /></>
                      )}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="anim-up-4 flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs text-slate-400 font-medium">secured by</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Trust badges */}
                <div className="anim-up-4 flex items-center justify-center gap-4">
                  {['256-bit SSL', 'A-Rated Cover', 'Zero Paperwork'].map(badge => (
                    <div key={badge} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5">
              By signing in you agree to our{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Terms</span> &{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
