import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  .otp-root { font-family: 'DM Sans', sans-serif; }
  .font-sora { font-family: 'Sora', sans-serif; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-logo {
    0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    50% { box-shadow: 0 0 0 14px rgba(37,99,235,0); }
  }

  .anim-up   { animation: fade-up 0.5s ease both; }
  .anim-up-1 { animation: fade-up 0.5s ease 0.1s both; }
  .anim-up-2 { animation: fade-up 0.5s ease 0.2s both; }
  .anim-up-3 { animation: fade-up 0.5s ease 0.3s both; }

  .pulse-logo { animation: pulse-logo 2.5s ease-in-out infinite; }

  .otp-input {
    width: 52px;
    height: 56px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    background: #f8fafc;
    color: #1e293b;
    transition: all 0.2s ease;
    outline: none;
  }
  .otp-input:focus {
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
  }
  .otp-input.filled {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .btn-verify {
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-verify:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 16px 32px -6px rgba(37,99,235,0.5);
  }
`;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const { verifyOtp } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await verifyOtp(email, otpString);
      setSuccess("Account verified! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="otp-root min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">

        <div className="w-full max-w-md">

          <div className="anim-up flex items-center gap-2.5 justify-center mb-8">
            <div className="pulse-logo w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-sora text-xl font-bold text-slate-800">
              Sky<span className="text-blue-600">Safe</span>
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/60 border border-slate-100 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

            <div className="p-8 sm:p-10">
              <div className="anim-up-1 text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <Shield size={28} className="text-blue-600" />
                </div>
                <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-2">
                  Verify your email
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We sent a 6-digit OTP to{" "}
                  <span className="font-bold text-slate-700">{email}</span>
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-sm">
                  <CheckCircle2 size={16} className="shrink-0" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="anim-up-2 flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`otp-input ${digit ? "filled" : ""}`}
                    />
                  ))}
                </div>

                <div className="anim-up-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-verify w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 text-sm"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Verifying...</>
                    ) : (
                      <><CheckCircle2 size={17} /> Verify OTP <ArrowRight size={17} /></>
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                OTP expires in <span className="font-bold text-slate-600">1.5 minutes</span>
              </p>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
                {["SSL Secured", "Zero Spam", "Cancel Anytime"].map((item) => (
                  <div key={item} className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            By signing up, you agree to our{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">Terms</span> &{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </>
  );
}