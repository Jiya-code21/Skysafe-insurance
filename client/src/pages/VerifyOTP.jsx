import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Shield, CheckCircle2, AlertCircle, Loader2,
  ArrowRight, RefreshCw, Mail, Lock, Zap, Users, Star
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const OTP_LENGTH = 6;
const TIMER_SECONDS = 90; // 1 min 30 sec

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .otp-root  { font-family: 'DM Sans', sans-serif; }
  .font-sora { font-family: 'Sora', sans-serif; }

  @keyframes float-r {
    0%,100% { transform: translateY(0) rotate(1deg); }
    50%      { transform: translateY(-12px) rotate(-1deg); }
  }
  @keyframes blob-r {
    0%,100% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
    50%      { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
  }
  @keyframes slide-left {
    from { opacity:0; transform: translateX(-28px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes slide-right {
    from { opacity:0; transform: translateX(28px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes fade-up {
    from { opacity:0; transform: translateY(14px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-logo {
    0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    50%      { box-shadow: 0 0 0 14px rgba(37,99,235,0); }
  }
  @keyframes timer-shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-6px); }
    80%      { transform: translateX(6px); }
  }
  @keyframes pop-in {
    0%   { transform: scale(0.85); opacity: 0; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1);    opacity: 1; }
  }

  .float-r  { animation: float-r 7s ease-in-out infinite; }
  .blob-r   { animation: blob-r 14s ease-in-out infinite; }
  .blob-r2  { animation: blob-r 10s ease-in-out infinite reverse; }

  .anim-l   { animation: slide-left  0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-r   { animation: slide-right 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-0   { animation: fade-up 0.45s ease both; }
  .anim-d1  { animation: fade-up 0.45s ease 0.08s both; }
  .anim-d2  { animation: fade-up 0.45s ease 0.16s both; }
  .anim-d3  { animation: fade-up 0.45s ease 0.24s both; }
  .anim-d4  { animation: fade-up 0.45s ease 0.32s both; }
  .anim-d5  { animation: fade-up 0.45s ease 0.40s both; }

  .shake    { animation: shake 0.45s ease both; }
  .pop-in   { animation: pop-in 0.4s cubic-bezier(0.22,1,0.36,1) both; }

  .glass {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.9);
  }

  .pulse-logo { animation: pulse-logo 2.5s ease-in-out infinite; }

  /* OTP digit box */
  .otp-box {
    width: 48px; height: 56px;
    text-align: center;
    font-size: 1.5rem; font-weight: 700;
    font-family: 'Sora', sans-serif;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    background: #f8fafc;
    color: #1e293b;
    transition: all 0.18s ease;
    caret-color: #3b82f6;
    outline: none;
  }
  .otp-box:focus {
    border-color: #3b82f6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
  }
  .otp-box.filled {
    border-color: #6366f1;
    background: #eef2ff;
    color: #4338ca;
  }
  .otp-box.error {
    border-color: #f87171;
    background: #fef2f2;
    color: #dc2626;
    box-shadow: 0 0 0 4px rgba(248,113,113,0.12);
  }
  .otp-box.success {
    border-color: #34d399;
    background: #ecfdf5;
    color: #059669;
  }
  .otp-box:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* Timer bar */
  .timer-bar-track {
    height: 5px;
    background: #e2e8f0;
    border-radius: 99px;
    overflow: hidden;
  }
  .timer-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 1s linear, background-color 0.5s ease;
  }

  /* Submit button */
  .btn-otp {
    position: relative; overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-otp::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
    opacity:0; transition: opacity 0.3s;
  }
  .btn-otp:hover::after { opacity:1; }
  .btn-otp:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 36px -6px rgba(37,99,235,0.45); }
  .btn-otp:active:not(:disabled) { transform: translateY(0); }

  /* Resend link */
  .resend-btn {
    background: none; border: none; padding: 0; cursor: pointer;
    color: #2563eb; font-weight: 700; font-size: 0.875rem;
    transition: color 0.2s;
    text-decoration: underline; text-underline-offset: 3px;
  }
  .resend-btn:hover { color: #1d4ed8; }
  .resend-btn:disabled { color: #94a3b8; cursor: not-allowed; text-decoration: none; }
`;

const perks = [
  { icon: Zap,    text: "Instant payouts under 2 min",    color: "bg-yellow-400/20", ic: "text-yellow-400" },
  { icon: Shield, text: "Up to ₹8,000 weekly protection", color: "bg-blue-400/20",   ic: "text-blue-300" },
  { icon: Users,  text: "2,400+ workers already joined",  color: "bg-sky-400/20",    ic: "text-sky-300" },
  { icon: Star,   text: "4.9★ rated by gig workers",      color: "bg-indigo-400/20", ic: "text-indigo-300" },
];

function maskEmail(email = "") {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const visible = user.slice(0, 3);
  return `${visible}${"*".repeat(Math.max(user.length - 3, 2))}@${domain}`;
}

export default function VerifyOTP() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { verifyOtp, resendOtp } = useAuth(); // wire these to your AuthContext

  // email passed from Register via navigate state
  const email = location.state?.email || "";

  const [otp, setOtp]           = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [expired, setExpired]   = useState(false);
  const [status, setStatus]     = useState("idle"); // idle | loading | success | error
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [shaking, setShaking]   = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);
  const timerRef  = useRef(null);

  // ── Timer ──────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeLeft(TIMER_SECONDS);
    setExpired(false);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const timerPct    = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor  = timeLeft > 30 ? "#3b82f6" : timeLeft > 10 ? "#f59e0b" : "#ef4444";
  const timerLabel  = `${String(Math.floor(timeLeft / 60)).padStart(2,"0")}:${String(timeLeft % 60).padStart(2,"0")}`;

  // ── OTP input handling ────────────────────────────────
  const focusBox = (i) => inputRefs.current[i]?.focus();

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < OTP_LENGTH - 1) focusBox(i + 1);
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp]; next[i] = ""; setOtp(next);
      } else if (i > 0) {
        focusBox(i - 1);
      }
    } else if (e.key === "ArrowLeft"  && i > 0)              focusBox(i - 1);
    else if (e.key === "ArrowRight" && i < OTP_LENGTH - 1)   focusBox(i + 1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  // ── Submit ────────────────────────────────────────────
  const handleVerify = async () => {
    if (expired) { setError("OTP has expired. Please request a new one."); triggerShake(); return; }
    const code = otp.join("");
    if (code.length < OTP_LENGTH) { setError("Please enter all 6 digits."); triggerShake(); return; }

    setStatus("loading"); setError("");
    try {
      await verifyOtp(email, code);
      setStatus("success");
      setSuccess("Email verified! Redirecting to login…");
      clearInterval(timerRef.current);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Invalid OTP. Please try again.");
      triggerShake();
      setOtp(Array(OTP_LENGTH).fill(""));
      focusBox(0);
    }
  };

  // ── Resend ────────────────────────────────────────────
  const handleResend = async () => {
    setResending(true); setError(""); setSuccess("");
    setOtp(Array(OTP_LENGTH).fill(""));
    try {
      await resendOtp(email);
      setSuccess("A new OTP has been sent to your email.");
      setStatus("idle");
      startTimer();
      focusBox(0);
    } catch (err) {
      setError(err.message || "Could not resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const isDisabled = status === "loading" || status === "success";
  const allFilled  = otp.every(d => d !== "");

  // box state class
  const boxClass = (i) => {
    if (status === "success") return "otp-box success";
    if (status === "error")   return "otp-box error";
    if (otp[i])               return "otp-box filled";
    return "otp-box";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="otp-root min-h-screen flex bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">

        {/* ══ LEFT PANEL ══════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[48%] relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-600">

          <div className="blob-r  absolute top-16 left-8   w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="blob-r2 absolute bottom-8 right-4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)", backgroundSize: "44px 44px" }}
          />

          <div className="relative z-10 max-w-sm w-full">
            {/* Logo */}
            <div className="anim-l flex items-center gap-3 mb-12">
              <img src="/logo.png" alt="SkySafe" className="pulse-logo w-16 h-16 object-contain drop-shadow-xl" />
              <span className="font-sora text-2xl font-bold text-white">
                Sky<span className="text-blue-200">Safe</span>
              </span>
            </div>

            <div className="anim-l mb-10">
              <h2 className="font-sora text-4xl font-extrabold text-white leading-[1.15] mb-4">
                One last step<br />
                <span className="text-blue-200">to protect</span><br />
                your income. ⚡
              </h2>
              <p className="text-blue-100/75 text-sm leading-relaxed">
                Verify your email to activate your SkySafe account and start earning fearlessly.
              </p>
            </div>

            {/* Perks */}
            <div className="space-y-3 mb-12">
              {perks.map(({ icon: Icon, text, color, ic }) => (
                <div key={text} className="flex items-center gap-3.5 px-4 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                    <Icon size={17} className={ic} />
                  </div>
                  <p className="text-white text-sm font-semibold">{text}</p>
                </div>
              ))}
            </div>

            {/* Floating mini card */}
            <div className="float-r glass rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <Lock size={17} className="text-white" />
              </div>
              <div>
                <p className="text-slate-700 text-xs font-medium">Your data is safe</p>
                <p className="text-slate-900 text-sm font-bold">256-bit SSL Encrypted</p>
              </div>
              <CheckCircle2 size={20} className="text-emerald-500 ml-auto shrink-0" />
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center p-5 relative overflow-y-auto">

          <div className="fixed top-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
          <div className="fixed bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

          <div className="anim-r w-full max-w-md relative z-10 py-6">

            {/* Mobile logo */}
            <div className="anim-0 lg:hidden flex items-center gap-2.5 mb-7">
              <img src="/logo.png" alt="SkySafe" className="w-12 h-12 object-contain" />
              <span className="font-sora text-xl font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400" />

              <div className="p-7 sm:p-9">

                {/* Header */}
                <div className="anim-0 mb-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-blue-500" />
                  </div>
                  <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-1">Verify your email</h1>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We sent a 6-digit code to<br />
                    <span className="font-semibold text-slate-700">{maskEmail(email) || "your email address"}</span>
                  </p>
                </div>

                {/* Alerts */}
                {error && (
                  <div className="anim-0 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <AlertCircle size={15} className="shrink-0" /> {error}
                  </div>
                )}
                {success && (
                  <div className="anim-0 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <CheckCircle2 size={15} className="shrink-0" /> {success}
                  </div>
                )}

                {/* OTP boxes */}
                <div className={`anim-d1 flex justify-center gap-2.5 mb-6 ${shaking ? "shake" : ""}`}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => inputRefs.current[i] = el}
                      className={boxClass(i)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      disabled={isDisabled || expired}
                      onChange={e => handleChange(e, i)}
                      onKeyDown={e => handleKeyDown(e, i)}
                      onPaste={handlePaste}
                      onFocus={e => e.target.select()}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="anim-d2 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-slate-500">
                      {expired ? "OTP expired" : "Time remaining"}
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: timerColor }}
                    >
                      {expired ? "00:00" : timerLabel}
                    </span>
                  </div>
                  <div className="timer-bar-track">
                    <div
                      className="timer-bar-fill"
                      style={{ width: `${timerPct}%`, backgroundColor: timerColor }}
                    />
                  </div>
                  {expired && (
                    <p className="text-xs text-red-500 font-medium mt-1.5 text-center">
                      Your OTP has expired. Please request a new one below.
                    </p>
                  )}
                </div>

                {/* Verify button */}
                <div className="anim-d3 mb-4">
                  <button
                    onClick={handleVerify}
                    disabled={isDisabled || expired || !allFilled}
                    className="btn-otp w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 text-sm"
                  >
                    {status === "loading"
                      ? <><Loader2 size={17} className="animate-spin" /> Verifying…</>
                      : status === "success"
                      ? <><CheckCircle2 size={17} /> Verified!</>
                      : <><Shield size={17} /> Verify Email <ArrowRight size={17} /></>
                    }
                  </button>
                </div>

                {/* Resend */}
                <div className="anim-d4 text-center">
                  <p className="text-sm text-slate-500">
                    Didn't receive the code?{" "}
                    <button
                      className="resend-btn"
                      onClick={handleResend}
                      disabled={resending || status === "loading" || status === "success"}
                    >
                      {resending
                        ? <span className="inline-flex items-center gap-1"><RefreshCw size={13} className="animate-spin" /> Sending…</span>
                        : "Resend OTP"
                      }
                    </button>
                  </p>
                </div>

                {/* Trust row */}
                <div className="anim-d5 flex items-center justify-center gap-4 mt-6 pt-5 border-t border-slate-100">
                  {["SSL Secured", "Zero Spam", "Cancel Anytime"].map(t => (
                    <div key={t} className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <CheckCircle2 size={12} className="text-emerald-500" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              By signing up, you agree to our{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Terms of Service</span>{" "}
              &{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}