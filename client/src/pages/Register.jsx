import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  MapPin,
  Zap,
  Users,
  Star,
  Lock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getAuthErrorMessage,
  validateRegisterForm,
} from "../utils/authValidation";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .reg-root { font-family: 'DM Sans', sans-serif; }
  .font-sora { font-family: 'Sora', sans-serif; }

  @keyframes float-r {
    0%,100% { transform: translateY(0) rotate(1deg); }
    50% { transform: translateY(-12px) rotate(-1deg); }
  }

  @keyframes blob-r {
    0%,100% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
    50% { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
  }

  @keyframes slide-left {
    from { opacity: 0; transform: translateX(-28px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slide-right {
    from { opacity: 0; transform: translateX(28px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes pulse-logo {
    0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    50% { box-shadow: 0 0 0 14px rgba(37,99,235,0); }
  }

  .float-r { animation: float-r 7s ease-in-out infinite; }
  .blob-r { animation: blob-r 14s ease-in-out infinite; }
  .blob-r2 { animation: blob-r 10s ease-in-out infinite reverse; }
  .anim-l { animation: slide-left 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-r { animation: slide-right 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-0 { animation: fade-up 0.45s ease both; }
  .anim-d1 { animation: fade-up 0.45s ease 0.08s both; }
  .anim-d2 { animation: fade-up 0.45s ease 0.16s both; }
  .anim-d3 { animation: fade-up 0.45s ease 0.24s both; }
  .anim-d4 { animation: fade-up 0.45s ease 0.32s both; }
  .anim-d5 { animation: fade-up 0.45s ease 0.40s both; }

  .glass {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.9);
  }

  .input-f {
    transition: all 0.2s ease;
    border: 1.5px solid #e2e8f0;
  }

  .input-f:focus {
    border-color: #3b82f6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
    outline: none;
  }

  .btn-reg {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .btn-reg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .btn-reg:hover::after { opacity: 1; }
  .btn-reg:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px -6px rgba(37,99,235,0.45);
  }

  .pulse-logo { animation: pulse-logo 2.5s ease-in-out infinite; }
`;

const getStrength = (password) => {
  if (!password) {
    return { label: "", color: "bg-slate-200", pct: "0%", textColor: "text-slate-400" };
  }
  if (password.length < 6) {
    return { label: "Weak", color: "bg-red-400", pct: "30%", textColor: "text-red-500" };
  }
  if (password.length < 10) {
    return { label: "Fair", color: "bg-amber-400", pct: "65%", textColor: "text-amber-500" };
  }
  return { label: "Strong", color: "bg-emerald-500", pct: "100%", textColor: "text-emerald-600" };
};

const perks = [
  { icon: Zap, text: "Instant payouts under 2 min", color: "bg-yellow-400/20", ic: "text-yellow-400" },
  { icon: Shield, text: "Up to Rs 8,000 weekly protection", color: "bg-blue-400/20", ic: "text-blue-300" },
  { icon: Users, text: "2,400+ workers already joined", color: "bg-sky-400/20", ic: "text-sky-300" },
  { icon: Star, text: "4.9 rated by gig workers", color: "bg-indigo-400/20", ic: "text-indigo-300" },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const getInputClass = (field) =>
    `input-f w-full rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400 ${
      fieldErrors[field] ? "border-red-300 bg-red-50/60" : ""
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errors = validateRegisterForm(form);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await register(form.name, form.email, form.password, form.location);
      setSuccess("OTP sent to your email! Redirecting...");
      setTimeout(() => navigate("/verify-otp", {
        state: { email: form.email }
      }), 1800);
    } catch (err) {
      setError(getAuthErrorMessage(err, "Registration failed. Try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root min-h-screen flex bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
        <div className="hidden lg:flex lg:w-[48%] relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-600">
          <div className="blob-r absolute top-16 left-8 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="blob-r2 absolute bottom-8 right-4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 max-w-sm w-full">
            <div className="anim-l flex items-center gap-3 mb-12">
              <img src="/logo.png" alt="SkySafe" className="pulse-logo w-16 h-16 object-contain drop-shadow-xl" />
              <span className="font-sora text-2xl font-bold text-white">
                Sky<span className="text-blue-200">Safe</span>
              </span>
            </div>

            <div className="anim-l mb-10">
              <h2 className="font-sora text-4xl font-extrabold text-white leading-[1.15] mb-4">
                Join 2,400+
                <br />
                <span className="text-blue-200">gig workers</span>
                <br />
                earning fearlessly.
              </h2>
              <p className="text-blue-100/75 text-sm leading-relaxed">
                Create your free account in 2 minutes and start protecting your weekly income today.
              </p>
            </div>

            <div className="space-y-3 mb-12">
              {perks.map(({ icon: Icon, text, color, ic }) => (
                <div
                  key={text}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default"
                >
                  <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                    <Icon size={17} className={ic} />
                  </div>
                  <p className="text-white text-sm font-semibold">{text}</p>
                </div>
              ))}
            </div>

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

        <div className="flex-1 flex items-center justify-center p-5 relative overflow-y-auto">
          <div className="fixed top-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
          <div className="fixed bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

          <div className="anim-r w-full max-w-md relative z-10 py-6">
            <div className="anim-0 lg:hidden flex items-center gap-2.5 mb-7">
              <img src="/logo.png" alt="SkySafe" className="w-12 h-12 object-contain" />
              <span className="font-sora text-xl font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400" />

              <div className="p-7 sm:p-9">
                <div className="anim-0 mb-7">
                  <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-1">
                    Create your account
                  </h1>
                  <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 font-bold hover:text-blue-700 transition-colors hover:underline underline-offset-2"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                {error && (
                  <div className="anim-0 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="anim-0 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <CheckCircle2 size={15} className="shrink-0" />
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="anim-d1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className={`${getInputClass("name")} px-4 py-3`}
                      />
                      {fieldErrors.name && (
                        <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        City
                      </label>
                      <div className="relative">
                        <MapPin
                          size={14}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Mumbai"
                          className={`${getInputClass("location")} pl-8 pr-3 py-3`}
                        />
                      </div>
                      {fieldErrors.location && (
                        <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="anim-d2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${getInputClass("email")} px-4 py-3`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div className="anim-d3">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter minimum 6 characters"
                        className={`${getInputClass("password")} px-4 py-3 pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="mt-2 text-xs font-medium text-red-600">{fieldErrors.password}</p>
                    )}

                    {form.password && (
                      <div className="mt-2.5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-slate-400">Password strength</span>
                          <span className={`text-xs font-bold ${strength.textColor}`}>{strength.label}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${strength.color} rounded-full transition-all duration-500`}
                            style={{ width: strength.pct }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="anim-d4">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                        className={`${getInputClass("confirmPassword")} px-4 py-3`}
                      />
                      {form.confirmPassword && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {form.password === form.confirmPassword ? (
                            <CheckCircle2 size={17} className="text-emerald-500" />
                          ) : (
                            <AlertCircle size={17} className="text-red-400" />
                          )}
                        </div>
                      )}
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="anim-d5 mt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-reg w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          <Shield size={17} />
                          Create My Free Account
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="anim-d5 flex items-center justify-center gap-4 mt-6 pt-5 border-t border-slate-100">
                  {["SSL Secured", "Zero Spam", "Cancel Anytime"].map((item) => (
                    <div key={item} className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              By signing up, you agree to our{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Terms of Service</span> &{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
