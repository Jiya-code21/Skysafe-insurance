// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Shield, AlertCircle, CheckCircle2, ArrowRight,
//   Loader2, ArrowLeft, KeyRound, Mail, Lock, Sparkles
// } from "lucide-react";
// import { authAPI } from "../api/api.js";

// /* ── Styles ─────────────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

//   .fp-root { font-family: 'DM Sans', sans-serif; }
//   .font-sora { font-family: 'Sora', sans-serif; }

//   @keyframes blob {
//     0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
//     50%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
//   }
//   @keyframes float {
//     0%,100% { transform: translateY(0) rotate(-1deg); }
//     50%      { transform: translateY(-14px) rotate(1deg); }
//   }
//   @keyframes slide-left {
//     from { opacity:0; transform:translateX(-28px); }
//     to   { opacity:1; transform:translateX(0); }
//   }
//   @keyframes slide-right {
//     from { opacity:0; transform:translateX(28px); }
//     to   { opacity:1; transform:translateX(0); }
//   }
//   @keyframes fade-up {
//     from { opacity:0; transform:translateY(14px); }
//     to   { opacity:1; transform:translateY(0); }
//   }
//   @keyframes step-pop {
//     0%   { transform:scale(0.6); opacity:0; }
//     60%  { transform:scale(1.15); }
//     100% { transform:scale(1); opacity:1; }
//   }
//   @keyframes success-bounce {
//     0%   { transform:scale(0); opacity:0; }
//     50%  { transform:scale(1.2); }
//     70%  { transform:scale(0.9); }
//     100% { transform:scale(1); opacity:1; }
//   }
//   @keyframes shimmer {
//     0%   { background-position:-200% center; }
//     100% { background-position: 200% center; }
//   }
//   @keyframes ring-pulse {
//     0%,100% { box-shadow:0 0 0 0 rgba(37,99,235,0.4); }
//     50%      { box-shadow:0 0 0 14px rgba(37,99,235,0); }
//   }
//   @keyframes otp-focus {
//     0%   { transform:scale(1); }
//     50%  { transform:scale(1.06); }
//     100% { transform:scale(1); }
//   }
//   @keyframes progress-fill {
//     from { width:0; }
//   }

//   .blob1  { animation:blob  12s ease-in-out infinite; }
//   .blob2  { animation:blob  16s ease-in-out infinite reverse; }
//   .floaty { animation:float  7s ease-in-out infinite; }

//   .anim-l  { animation:slide-left  0.65s cubic-bezier(0.22,1,0.36,1) both; }
//   .anim-r  { animation:slide-right 0.65s cubic-bezier(0.22,1,0.36,1) both; }
//   .anim-0  { animation:fade-up 0.45s ease both; }
//   .anim-1  { animation:fade-up 0.45s ease 0.08s both; }
//   .anim-2  { animation:fade-up 0.45s ease 0.16s both; }
//   .anim-3  { animation:fade-up 0.45s ease 0.24s both; }

//   .step-icon { animation:step-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
//   .success-icon { animation:success-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

//   .shimmer {
//     background:linear-gradient(90deg,#1d4ed8,#60a5fa,#0ea5e9,#60a5fa,#1d4ed8);
//     background-size:200% auto;
//     -webkit-background-clip:text; -webkit-text-fill-color:transparent;
//     background-clip:text;
//     animation:shimmer 4s linear infinite;
//   }

//   .glass {
//     background:rgba(255,255,255,0.8);
//     backdrop-filter:blur(18px);
//     -webkit-backdrop-filter:blur(18px);
//     border:1px solid rgba(255,255,255,0.9);
//   }

//   .input-f {
//     transition:all 0.2s ease;
//     border:1.5px solid #e2e8f0;
//   }
//   .input-f:focus {
//     border-color:#3b82f6;
//     background:#fff;
//     box-shadow:0 0 0 4px rgba(59,130,246,0.1);
//     outline:none;
//   }

//   .btn-main {
//     position:relative; overflow:hidden;
//     transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
//   }
//   .btn-main::after {
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
//     opacity:0; transition:opacity 0.3s;
//   }
//   .btn-main:hover::after { opacity:1; }
//   .btn-main:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 18px 36px -6px rgba(37,99,235,0.45); }
//   .btn-main:active:not(:disabled) { transform:translateY(0); }

//   .otp-box {
//     transition:all 0.2s ease;
//     border:2px solid #e2e8f0;
//     font-family:'Sora',sans-serif;
//   }
//   .otp-box:focus {
//     border-color:#3b82f6;
//     background:#fff;
//     box-shadow:0 0 0 4px rgba(59,130,246,0.12);
//     outline:none;
//     animation:otp-focus 0.3s ease;
//   }
//   .otp-box.filled {
//     border-color:#3b82f6;
//     background:#eff6ff;
//     color:#1d4ed8;
//   }

//   .progress-bar { animation:progress-fill 0.5s ease; }
//   .ring-logo { animation:ring-pulse 2.5s ease-in-out infinite; }

//   .step-pill {
//     transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
//   }
// `;

// const STEPS = { EMAIL: 1, OTP: 2, RESET: 3, SUCCESS: 4 };

// const stepMeta = {
//   1: { icon: Mail,    color: "bg-blue-600",   label: "Email",    progressPct: "33%" },
//   2: { icon: Shield,  color: "bg-sky-500",    label: "Verify",   progressPct: "66%" },
//   3: { icon: KeyRound,color: "bg-indigo-600", label: "Reset",    progressPct: "100%" },
//   4: { icon: CheckCircle2, color:"bg-emerald-500", label:"Done", progressPct:"100%" },
// };

// /* ── OTP Input Component ─────────────────────────────────────────── */
// const OtpInput = ({ value, onChange }) => {
//   const refs = Array.from({ length: 6 }, () => useRef(null));
//   const digits = value.padEnd(6, '').split('');

//   const handleKey = (i, e) => {
//     if (e.key === 'Backspace') {
//       const next = value.slice(0, i === 0 ? 0 : i - (value[i] ? 0 : 1));
//       onChange(next);
//       if (!value[i] && i > 0) refs[i - 1].current?.focus();
//     }
//   };

//   const handleInput = (i, e) => {
//     const char = e.target.value.replace(/\D/g, '').slice(-1);
//     if (!char) return;
//     const arr = digits.map(d => d === ' ' ? '' : d);
//     arr[i] = char;
//     const newVal = arr.join('').replace(/ /g, '').slice(0, 6);
//     onChange(newVal);
//     if (i < 5) refs[i + 1].current?.focus();
//   };

//   const handlePaste = (e) => {
//     const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
//     onChange(pasted);
//     refs[Math.min(pasted.length, 5)].current?.focus();
//     e.preventDefault();
//   };

//   return (
//     <div className="flex gap-2.5 justify-center">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <input
//           key={i}
//           ref={refs[i]}
//           type="text"
//           inputMode="numeric"
//           maxLength={1}
//           value={digits[i] === ' ' ? '' : digits[i] || ''}
//           onChange={(e) => handleInput(i, e)}
//           onKeyDown={(e) => handleKey(i, e)}
//           onPaste={handlePaste}
//           onFocus={(e) => e.target.select()}
//           className={`otp-box w-11 h-14 rounded-xl text-center text-xl font-bold bg-slate-50 text-slate-800 ${digits[i] && digits[i] !== ' ' ? 'filled' : ''}`}
//         />
//       ))}
//     </div>
//   );
// };

// /* ── Main Component ──────────────────────────────────────────────── */
// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [step, setStep]           = useState(STEPS.EMAIL);
//   const [email, setEmail]         = useState("");
//   const [otp, setOtp]             = useState("");
//   const [newPassword, setNewPassword]       = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading]     = useState(false);
//   const [error, setError]         = useState("");
//   const [info, setInfo]           = useState("");

//   const meta = stepMeta[step];

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError(""); setInfo("");
//     if (!email) { setError("Please enter your email."); return; }
//     setLoading(true);
//     try {
//       const data = await authAPI.forgotPassword({ email });
//       setInfo(data.otp ? `OTP sent! (Dev: ${data.otp})` : "OTP sent to your email.");
//       setStep(STEPS.OTP);
//     } catch (err) { setError(err.message); }
//     finally { setLoading(false); }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError(""); setInfo("");
//     if (otp.length < 6) { setError("Please enter the complete 6-digit OTP."); return; }
//     setLoading(true);
//     try {
//       await authAPI.verifyOtp({ email, otp });
//       setStep(STEPS.RESET);
//     } catch (err) { setError(err.message); }
//     finally { setLoading(false); }
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError(""); setInfo("");
//     if (!newPassword) { setError("Please enter a new password."); return; }
//     if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
//     if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
//     setLoading(true);
//     try {
//       await authAPI.resetPassword({ email, otp, newPassword });
//       setStep(STEPS.SUCCESS);
//     } catch (err) { setError(err.message); }
//     finally { setLoading(false); }
//   };

//   const getStrength = (p) => {
//     if (!p) return null;
//     if (p.length < 6)  return { label:"Weak",   color:"bg-red-400",    pct:"30%",  tc:"text-red-500" };
//     if (p.length < 10) return { label:"Fair",   color:"bg-amber-400",  pct:"65%",  tc:"text-amber-500" };
//     return               { label:"Strong", color:"bg-emerald-500", pct:"100%", tc:"text-emerald-600" };
//   };
//   const strength = getStrength(newPassword);

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="fp-root min-h-screen flex bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">

//         {/* ══ LEFT PANEL ══════════════════════════════════════ */}
//         <div className="hidden lg:flex lg:w-[46%] relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600">

//           <div className="blob1 absolute top-16 left-8   w-72 h-72 bg-white/10 rounded-full blur-2xl" />
//           <div className="blob2 absolute bottom-8 right-4 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl" />
//           <div className="absolute inset-0 opacity-[0.07]"
//             style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize:'44px 44px' }}
//           />

//           <div className="relative z-10 max-w-xs w-full">
//             {/* Logo */}
//             <div className="anim-l flex items-center gap-3 mb-14">
//               <img src="/logo.png" alt="SkySafe" className="ring-logo w-12 h-12 object-contain rounded-2xl shadow-xl" />
//               <span className="font-sora text-2xl font-bold text-white">
//                 Sky<span className="text-blue-200">Safe</span>
//               </span>
//             </div>

//             {/* Headline */}
//             <div className="anim-l mb-12">
//               <h2 className="font-sora text-4xl font-extrabold text-white leading-tight mb-4">
//                 Don't worry,<br />
//                 <span className="text-blue-200">we've got</span><br />
//                 you covered. 🔐
//               </h2>
//               <p className="text-blue-100/75 text-sm leading-relaxed">
//                 Reset your password in 3 simple steps. Your account and coverage will stay fully protected.
//               </p>
//             </div>

//             {/* Step indicators — left side */}
//             <div className="space-y-4">
//               {[
//                 { n:1, label:"Enter your email",        icon: Mail },
//                 { n:2, label:"Verify with OTP code",    icon: Shield },
//                 { n:3, label:"Set your new password",   icon: KeyRound },
//               ].map(({ n, label, icon: Icon }) => {
//                 const isActive   = step === n;
//                 const isComplete = step > n;
//                 return (
//                   <div key={n} className={`flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all duration-300 ${
//                     isActive   ? 'bg-white/20 border-white/30' :
//                     isComplete ? 'bg-white/10 border-white/10 opacity-80' :
//                                  'border-white/5 opacity-40'
//                   }`}>
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
//                       isComplete ? 'bg-emerald-400' : isActive ? 'bg-white/25' : 'bg-white/10'
//                     }`}>
//                       {isComplete
//                         ? <CheckCircle2 size={17} className="text-white" />
//                         : <Icon size={16} className="text-white" />
//                       }
//                     </div>
//                     <div>
//                       <p className="text-white text-sm font-semibold">{label}</p>
//                       <p className="text-blue-200/60 text-xs">
//                         {isComplete ? 'Completed ✓' : isActive ? 'In progress…' : 'Upcoming'}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Floating security card */}
//             <div className="floaty mt-10 glass rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl">
//               <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
//                 <Lock size={17} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-slate-600 text-xs font-medium">Recovery is secure</p>
//                 <p className="text-slate-900 text-sm font-bold">OTP expires in 5 min</p>
//               </div>
//               <Sparkles size={18} className="text-blue-400 ml-auto shrink-0" />
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT PANEL ═════════════════════════════════════ */}
//         <div className="flex-1 flex items-center justify-center p-6 relative">

//           <div className="fixed top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
//           <div className="fixed bottom-0 left-0 w-72 h-72 bg-sky-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

//           <div className="anim-r w-full max-w-md relative z-10">

//             {/* Mobile logo */}
//             <div className="anim-0 lg:hidden flex items-center gap-2.5 mb-8">
//               <img src="/logo.png" alt="SkySafe" className="w-10 h-10 object-contain rounded-xl" />
//               <span className="font-sora text-xl font-bold text-slate-800">
//                 Sky<span className="text-blue-600">Safe</span>
//               </span>
//             </div>

//             <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/60 border border-slate-100 overflow-hidden">

//               {/* Top gradient bar */}
//               <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

//               {/* Progress bar */}
//               {step !== STEPS.SUCCESS && (
//                 <div className="h-1 bg-slate-100">
//                   <div
//                     key={step}
//                     className={`progress-bar h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500`}
//                     style={{ width: meta.progressPct }}
//                   />
//                 </div>
//               )}

//               <div className="p-8 sm:p-10">

//                 {/* Step pills — top */}
//                 {step !== STEPS.SUCCESS && (
//                   <div className="anim-0 flex items-center gap-2 mb-8">
//                     {[1,2,3].map(s => (
//                       <React.Fragment key={s}>
//                         <div className={`step-pill flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
//                           step === s
//                             ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
//                             : step > s
//                             ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
//                             : 'bg-slate-100 text-slate-400'
//                         }`}>
//                           {step > s ? <CheckCircle2 size={12}/> : <span>{s}</span>}
//                           {s === 1 ? 'Email' : s === 2 ? 'Verify' : 'Reset'}
//                         </div>
//                         {s < 3 && <div className={`flex-1 h-px transition-colors ${step > s ? 'bg-emerald-300' : 'bg-slate-100'}`} />}
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 )}

//                 {/* Step icon */}
//                 <div className="anim-0 mb-5">
//                   {step === STEPS.SUCCESS ? (
//                     <div className="success-icon w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-200 mb-5">
//                       <CheckCircle2 size={32} className="text-white" />
//                     </div>
//                   ) : (
//                     <div className={`step-icon w-14 h-14 rounded-2xl ${meta.color} flex items-center justify-center shadow-xl mb-5`}
//                       style={{ boxShadow: step === 1 ? '0 12px 24px -4px rgba(37,99,235,0.4)' : step === 2 ? '0 12px 24px -4px rgba(14,165,233,0.4)' : '0 12px 24px -4px rgba(79,70,229,0.4)' }}
//                     >
//                       {React.createElement(meta.icon, { size:26, className:"text-white" })}
//                     </div>
//                   )}

//                   <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-1.5">
//                     {step === STEPS.EMAIL   ? "Forgot your password?" :
//                      step === STEPS.OTP    ? "Check your inbox" :
//                      step === STEPS.RESET  ? "Set new password" :
//                                              "All done! 🎉"}
//                   </h1>
//                   <p className="text-sm text-slate-500">
//                     {step === STEPS.EMAIL  ? "Enter your registered email to receive a one-time code." :
//                      step === STEPS.OTP   ? <>We sent a 6-digit code to <span className="font-bold text-blue-600">{email}</span></> :
//                      step === STEPS.RESET ? "Almost there — choose a strong new password." :
//                                             "Your password has been reset successfully."}
//                   </p>
//                 </div>

//                 {/* Alerts */}
//                 {error && (
//                   <div className="anim-0 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
//                     <AlertCircle size={15} className="shrink-0" /> {error}
//                   </div>
//                 )}
//                 {info && (
//                   <div className="anim-0 flex items-center gap-2.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3 mb-5 text-sm">
//                     <CheckCircle2 size={15} className="shrink-0" /> {info}
//                   </div>
//                 )}

//                 {/* ── STEP 1: Email ───────────────────────────── */}
//                 {step === STEPS.EMAIL && (
//                   <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
//                     <div className="anim-1">
//                       <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Email Address</label>
//                       <div className="relative">
//                         <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                         <input
//                           type="email" value={email}
//                           onChange={e => setEmail(e.target.value)}
//                           placeholder="you@example.com"
//                           className="input-f w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
//                         />
//                       </div>
//                     </div>
//                     <div className="anim-2">
//                       <button type="submit" disabled={loading}
//                         className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
//                         {loading
//                           ? <><Loader2 size={17} className="animate-spin"/> Sending OTP…</>
//                           : <><Mail size={17}/> Send OTP Code <ArrowRight size={17}/></>
//                         }
//                       </button>
//                     </div>
//                     <div className="anim-3 text-center">
//                       <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors font-medium">
//                         <ArrowLeft size={14}/> Back to Login
//                       </Link>
//                     </div>
//                   </form>
//                 )}

//                 {/* ── STEP 2: OTP ─────────────────────────────── */}
//                 {step === STEPS.OTP && (
//                   <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
//                     <div className="anim-1">
//                       <label className="block text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide text-center">
//                         Enter 6-digit code
//                       </label>
//                       <OtpInput value={otp} onChange={setOtp} />
//                       {otp.length === 6 && (
//                         <p className="text-center text-xs text-emerald-600 font-semibold mt-3 flex items-center justify-center gap-1">
//                           <CheckCircle2 size={13}/> Code complete
//                         </p>
//                       )}
//                     </div>
//                     <div className="anim-2">
//                       <button type="submit" disabled={loading || otp.length < 6}
//                         className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
//                         {loading
//                           ? <><Loader2 size={17} className="animate-spin"/> Verifying…</>
//                           : <><Shield size={17}/> Verify OTP <ArrowRight size={17}/></>
//                         }
//                       </button>
//                     </div>
//                     <div className="anim-3 flex items-center justify-between text-sm">
//                       <button type="button" onClick={() => { setStep(STEPS.EMAIL); setOtp(""); }}
//                         className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors font-medium">
//                         <ArrowLeft size={14}/> Change email
//                       </button>
//                       <button type="button" onClick={handleSendOtp}
//                         className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
//                         Resend OTP
//                       </button>
//                     </div>
//                   </form>
//                 )}

//                 {/* ── STEP 3: New Password ─────────────────────── */}
//                 {step === STEPS.RESET && (
//                   <form onSubmit={handleReset} className="flex flex-col gap-5">
//                     <div className="anim-1">
//                       <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">New Password</label>
//                       <div className="relative">
//                         <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
//                         <input
//                           type="password" value={newPassword}
//                           onChange={e => setNewPassword(e.target.value)}
//                           placeholder="Min. 6 characters"
//                           className="input-f w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
//                         />
//                       </div>
//                       {strength && (
//                         <div className="mt-2.5">
//                           <div className="flex justify-between mb-1.5">
//                             <span className="text-xs text-slate-400">Strength</span>
//                             <span className={`text-xs font-bold ${strength.tc}`}>{strength.label}</span>
//                           </div>
//                           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                             <div className={`h-full ${strength.color} rounded-full transition-all duration-500`} style={{ width: strength.pct }}/>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="anim-2">
//                       <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Confirm Password</label>
//                       <div className="relative">
//                         <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
//                         <input
//                           type="password" value={confirmPassword}
//                           onChange={e => setConfirmPassword(e.target.value)}
//                           placeholder="Repeat password"
//                           className="input-f w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
//                         />
//                         {confirmPassword && (
//                           <div className="absolute right-4 top-1/2 -translate-y-1/2">
//                             {newPassword === confirmPassword
//                               ? <CheckCircle2 size={17} className="text-emerald-500"/>
//                               : <AlertCircle  size={17} className="text-red-400"/>
//                             }
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="anim-3">
//                       <button type="submit" disabled={loading}
//                         className="btn-main w-full flex items-center justify-center gap-2.5 bg-indigo-600 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 text-sm">
//                         {loading
//                           ? <><Loader2 size={17} className="animate-spin"/> Resetting…</>
//                           : <><KeyRound size={17}/> Reset My Password <ArrowRight size={17}/></>
//                         }
//                       </button>
//                     </div>
//                   </form>
//                 )}

//                 {/* ── STEP 4: Success ──────────────────────────── */}
//                 {step === STEPS.SUCCESS && (
//                   <div className="flex flex-col items-center gap-5 text-center">
//                     <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
//                       <p className="text-emerald-700 font-semibold text-sm mb-1">Password Updated!</p>
//                       <p className="text-emerald-600 text-xs">
//                         Your account is secured. You can now log in with your new password.
//                       </p>
//                     </div>
//                     <button onClick={() => navigate("/login")}
//                       className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
//                       <Shield size={17}/> Go to Login <ArrowRight size={17}/>
//                     </button>
//                     <p className="text-xs text-slate-400">
//                       Need help?{" "}
//                       <span className="text-blue-500 cursor-pointer hover:underline">Contact Support</span>
//                     </p>
//                   </div>
//                 )}

//               </div>
//             </div>

//             <p className="text-center text-xs text-slate-400 mt-4">
//               Remembered your password?{" "}
//               <Link to="/login" className="text-blue-500 font-semibold hover:underline underline-offset-2">
//                 Sign in →
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, AlertCircle, CheckCircle2, ArrowRight,
  Loader2, ArrowLeft, KeyRound, Mail, Lock, Sparkles
} from "lucide-react";
import { authAPI } from "../api/api.js";

/* ── Styles ─────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .fp-root { font-family: 'DM Sans', sans-serif; }
  .font-sora { font-family: 'Sora', sans-serif; }

  @keyframes blob {
    0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
    50%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0) rotate(-1deg); }
    50%      { transform: translateY(-14px) rotate(1deg); }
  }
  @keyframes slide-left {
    from { opacity:0; transform:translateX(-28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slide-right {
    from { opacity:0; transform:translateX(28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes step-pop {
    0%   { transform:scale(0.6); opacity:0; }
    60%  { transform:scale(1.15); }
    100% { transform:scale(1); opacity:1; }
  }
  @keyframes success-bounce {
    0%   { transform:scale(0); opacity:0; }
    50%  { transform:scale(1.2); }
    70%  { transform:scale(0.9); }
    100% { transform:scale(1); opacity:1; }
  }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ring-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(37,99,235,0.4); }
    50%      { box-shadow:0 0 0 14px rgba(37,99,235,0); }
  }
  @keyframes otp-focus {
    0%   { transform:scale(1); }
    50%  { transform:scale(1.06); }
    100% { transform:scale(1); }
  }
  @keyframes progress-fill {
    from { width:0; }
  }

  .blob1  { animation:blob  12s ease-in-out infinite; }
  .blob2  { animation:blob  16s ease-in-out infinite reverse; }
  .floaty { animation:float  7s ease-in-out infinite; }

  .anim-l  { animation:slide-left  0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-r  { animation:slide-right 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-0  { animation:fade-up 0.45s ease both; }
  .anim-1  { animation:fade-up 0.45s ease 0.08s both; }
  .anim-2  { animation:fade-up 0.45s ease 0.16s both; }
  .anim-3  { animation:fade-up 0.45s ease 0.24s both; }

  .step-icon { animation:step-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
  .success-icon { animation:success-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

  .shimmer {
    background:linear-gradient(90deg,#1d4ed8,#60a5fa,#0ea5e9,#60a5fa,#1d4ed8);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 4s linear infinite;
  }

  .glass {
    background:rgba(255,255,255,0.8);
    backdrop-filter:blur(18px);
    -webkit-backdrop-filter:blur(18px);
    border:1px solid rgba(255,255,255,0.9);
  }

  .input-f {
    transition:all 0.2s ease;
    border:1.5px solid #e2e8f0;
  }
  .input-f:focus {
    border-color:#3b82f6;
    background:#fff;
    box-shadow:0 0 0 4px rgba(59,130,246,0.1);
    outline:none;
  }

  .btn-main {
    position:relative; overflow:hidden;
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-main::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
    opacity:0; transition:opacity 0.3s;
  }
  .btn-main:hover::after { opacity:1; }
  .btn-main:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 18px 36px -6px rgba(37,99,235,0.45); }
  .btn-main:active:not(:disabled) { transform:translateY(0); }

  .otp-box {
    transition:all 0.2s ease;
    border:2px solid #e2e8f0;
    font-family:'Sora',sans-serif;
  }
  .otp-box:focus {
    border-color:#3b82f6;
    background:#fff;
    box-shadow:0 0 0 4px rgba(59,130,246,0.12);
    outline:none;
    animation:otp-focus 0.3s ease;
  }
  .otp-box.filled {
    border-color:#3b82f6;
    background:#eff6ff;
    color:#1d4ed8;
  }

  .progress-bar { animation:progress-fill 0.5s ease; }
  .ring-logo { animation:ring-pulse 2.5s ease-in-out infinite; }

  .step-pill {
    transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
`;

const STEPS = { EMAIL: 1, OTP: 2, RESET: 3, SUCCESS: 4 };

const stepMeta = {
  1: { icon: Mail,     color: "bg-blue-600",    label: "Email",  progressPct: "33%"  },
  2: { icon: Shield,   color: "bg-sky-500",     label: "Verify", progressPct: "66%"  },
  3: { icon: KeyRound, color: "bg-indigo-600",  label: "Reset",  progressPct: "100%" },
  4: { icon: CheckCircle2, color: "bg-emerald-500", label: "Done", progressPct: "100%" },
};

/* ── OTP Input Component ─────────────────────────────────────────── */
const OtpInput = ({ value, onChange }) => {
  const refs = Array.from({ length: 6 }, () => useRef(null));
  const digits = value.padEnd(6, ' ').split('');

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = value.slice(0, i === 0 ? 0 : i - (value[i] ? 0 : 1));
      onChange(next);
      if (!value[i] && i > 0) refs[i - 1].current?.focus();
    }
  };

  const handleInput = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    const arr = digits.map(d => d === ' ' ? '' : d);
    arr[i] = char;
    const newVal = arr.join('').replace(/ /g, '').slice(0, 6);
    onChange(newVal);
    if (i < 5) refs[i + 1].current?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    refs[Math.min(pasted.length, 5)].current?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] === ' ' ? '' : digits[i] || ''}
          onChange={(e) => handleInput(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`otp-box w-11 h-14 rounded-xl text-center text-xl font-bold bg-slate-50 text-slate-800 ${digits[i] && digits[i] !== ' ' ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────────── */
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep]                     = useState(STEPS.EMAIL);
  const [email, setEmail]                   = useState("");
  const [otp, setOtp]                       = useState("");
  const [newPassword, setNewPassword]       = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [info, setInfo]                     = useState("");

  const meta = stepMeta[step];

  // ── Step 1: Email submit → OTP bhejo ──────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    if (!email) { setError("Please enter your email."); return; }
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setInfo("OTP sent to your email.");
      setStep(STEPS.OTP);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: OTP verify ─────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    if (otp.length < 6) { setError("Please enter the complete 6-digit OTP."); return; }
    setLoading(true);
    try {
      await authAPI.verifyForgotOtp({ email, otp }); // ✅ sahi route
      setStep(STEPS.RESET);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Naya password set karo ────────────────────────────
  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    if (!newPassword) { setError("Please enter a new password."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await authAPI.resetPassword({ email, otp, newPassword });
      setStep(STEPS.SUCCESS);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (p) => {
    if (!p) return null;
    if (p.length < 6)  return { label: "Weak",   color: "bg-red-400",    pct: "30%",  tc: "text-red-500" };
    if (p.length < 10) return { label: "Fair",   color: "bg-amber-400",  pct: "65%",  tc: "text-amber-500" };
    return               { label: "Strong", color: "bg-emerald-500", pct: "100%", tc: "text-emerald-600" };
  };
  const strength = getStrength(newPassword);

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root min-h-screen flex bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">

        {/* ══ LEFT PANEL ══════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[46%] relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600">

          <div className="blob1 absolute top-16 left-8   w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="blob2 absolute bottom-8 right-4 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '44px 44px' }}
          />

          <div className="relative z-10 max-w-xs w-full">
            {/* Logo */}
            <div className="anim-l flex items-center gap-3 mb-14">
              <img src="/logo.png" alt="SkySafe" className="ring-logo w-16 h-16 object-contain drop-shadow-xl" />
              <span className="font-sora text-2xl font-bold text-white">
                Sky<span className="text-blue-200">Safe</span>
              </span>
            </div>

            {/* Headline */}
            <div className="anim-l mb-12">
              <h2 className="font-sora text-4xl font-extrabold text-white leading-tight mb-4">
                Don't worry,<br />
                <span className="text-blue-200">we've got</span><br />
                you covered. 🔐
              </h2>
              <p className="text-blue-100/75 text-sm leading-relaxed">
                Reset your password in 3 simple steps. Your account and coverage will stay fully protected.
              </p>
            </div>

            {/* Step indicators */}
            <div className="space-y-4">
              {[
                { n: 1, label: "Enter your email",      icon: Mail },
                { n: 2, label: "Verify with OTP code",  icon: Shield },
                { n: 3, label: "Set your new password", icon: KeyRound },
              ].map(({ n, label, icon: Icon }) => {
                const isActive   = step === n;
                const isComplete = step > n;
                return (
                  <div key={n} className={`flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                    isActive   ? 'bg-white/20 border-white/30' :
                    isComplete ? 'bg-white/10 border-white/10 opacity-80' :
                                 'border-white/5 opacity-40'
                  }`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isComplete ? 'bg-emerald-400' : isActive ? 'bg-white/25' : 'bg-white/10'
                    }`}>
                      {isComplete
                        ? <CheckCircle2 size={17} className="text-white" />
                        : <Icon size={16} className="text-white" />
                      }
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{label}</p>
                      <p className="text-blue-200/60 text-xs">
                        {isComplete ? 'Completed ✓' : isActive ? 'In progress…' : 'Upcoming'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating security card */}
            <div className="floaty mt-10 glass rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <Lock size={17} className="text-white" />
              </div>
              <div>
                <p className="text-slate-600 text-xs font-medium">Recovery is secure</p>
                <p className="text-slate-900 text-sm font-bold">OTP expires in 10 min</p>
              </div>
              <Sparkles size={18} className="text-blue-400 ml-auto shrink-0" />
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center p-6 relative">

          <div className="fixed top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-72 h-72 bg-sky-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

          <div className="anim-r w-full max-w-md relative z-10">

            {/* Mobile logo */}
            <div className="anim-0 lg:hidden flex items-center gap-2.5 mb-8">
              <img src="/logo.png" alt="SkySafe" className="w-12 h-12 object-contain" />
              <span className="font-sora text-xl font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/60 border border-slate-100 overflow-hidden">

              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

              {/* Progress bar */}
              {step !== STEPS.SUCCESS && (
                <div className="h-1 bg-slate-100">
                  <div
                    key={step}
                    className="progress-bar h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
                    style={{ width: meta.progressPct }}
                  />
                </div>
              )}

              <div className="p-8 sm:p-10">

                {/* Step pills */}
                {step !== STEPS.SUCCESS && (
                  <div className="anim-0 flex items-center gap-2 mb-8">
                    {[1, 2, 3].map(s => (
                      <React.Fragment key={s}>
                        <div className={`step-pill flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          step === s
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                            : step > s
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {step > s ? <CheckCircle2 size={12} /> : <span>{s}</span>}
                          {s === 1 ? 'Email' : s === 2 ? 'Verify' : 'Reset'}
                        </div>
                        {s < 3 && <div className={`flex-1 h-px transition-colors ${step > s ? 'bg-emerald-300' : 'bg-slate-100'}`} />}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Step icon + heading */}
                <div className="anim-0 mb-5">
                  {step === STEPS.SUCCESS ? (
                    <div className="success-icon w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-200 mb-5">
                      <CheckCircle2 size={32} className="text-white" />
                    </div>
                  ) : (
                    <div
                      className={`step-icon w-14 h-14 rounded-2xl ${meta.color} flex items-center justify-center shadow-xl mb-5`}
                      style={{ boxShadow: step === 1 ? '0 12px 24px -4px rgba(37,99,235,0.4)' : step === 2 ? '0 12px 24px -4px rgba(14,165,233,0.4)' : '0 12px 24px -4px rgba(79,70,229,0.4)' }}
                    >
                      {React.createElement(meta.icon, { size: 26, className: "text-white" })}
                    </div>
                  )}

                  <h1 className="font-sora text-2xl font-extrabold text-slate-800 mb-1.5">
                    {step === STEPS.EMAIL   ? "Forgot your password?" :
                     step === STEPS.OTP    ? "Check your inbox" :
                     step === STEPS.RESET  ? "Set new password" :
                                             "All done! 🎉"}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {step === STEPS.EMAIL  ? "Enter your registered email to receive a one-time code." :
                     step === STEPS.OTP   ? <><span>We sent a 6-digit code to </span><span className="font-bold text-blue-600">{email}</span></> :
                     step === STEPS.RESET ? "Almost there — choose a strong new password." :
                                            "Your password has been reset successfully."}
                  </p>
                </div>

                {/* Alerts */}
                {error && (
                  <div className="anim-0 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <AlertCircle size={15} className="shrink-0" /> {error}
                  </div>
                )}
                {info && (
                  <div className="anim-0 flex items-center gap-2.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <CheckCircle2 size={15} className="shrink-0" /> {info}
                  </div>
                )}

                {/* ── STEP 1: Email ─────────────────────────── */}
                {step === STEPS.EMAIL && (
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                    <div className="anim-1">
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="input-f w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
                        />
                      </div>
                    </div>
                    <div className="anim-2">
                      <button type="submit" disabled={loading}
                        className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
                        {loading
                          ? <><Loader2 size={17} className="animate-spin" /> Sending OTP…</>
                          : <><Mail size={17} /> Send OTP Code <ArrowRight size={17} /></>
                        }
                      </button>
                    </div>
                    <div className="anim-3 text-center">
                      <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft size={14} /> Back to Login
                      </Link>
                    </div>
                  </form>
                )}

                {/* ── STEP 2: OTP ───────────────────────────── */}
                {step === STEPS.OTP && (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                    <div className="anim-1">
                      <label className="block text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide text-center">
                        Enter 6-digit code
                      </label>
                      <OtpInput value={otp} onChange={setOtp} />
                      {otp.length === 6 && (
                        <p className="text-center text-xs text-emerald-600 font-semibold mt-3 flex items-center justify-center gap-1">
                          <CheckCircle2 size={13} /> Code complete
                        </p>
                      )}
                    </div>
                    <div className="anim-2">
                      <button type="submit" disabled={loading || otp.length < 6}
                        className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
                        {loading
                          ? <><Loader2 size={17} className="animate-spin" /> Verifying…</>
                          : <><Shield size={17} /> Verify OTP <ArrowRight size={17} /></>
                        }
                      </button>
                    </div>
                    <div className="anim-3 flex items-center justify-between text-sm">
                      <button type="button" onClick={() => { setStep(STEPS.EMAIL); setOtp(""); }}
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft size={14} /> Change email
                      </button>
                      <button type="button" onClick={handleSendOtp}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                        Resend OTP
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP 3: New Password ─────────────────── */}
                {step === STEPS.RESET && (
                  <form onSubmit={handleReset} className="flex flex-col gap-5">
                    <div className="anim-1">
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">New Password</label>
                      <div className="relative">
                        <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          className="input-f w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
                        />
                      </div>
                      {strength && (
                        <div className="mt-2.5">
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-slate-400">Strength</span>
                            <span className={`text-xs font-bold ${strength.tc}`}>{strength.label}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${strength.color} rounded-full transition-all duration-500`} style={{ width: strength.pct }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="anim-2">
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Confirm Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="input-f w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-50 text-slate-800 text-sm placeholder-slate-400"
                        />
                        {confirmPassword && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {newPassword === confirmPassword
                              ? <CheckCircle2 size={17} className="text-emerald-500" />
                              : <AlertCircle  size={17} className="text-red-400" />
                            }
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="anim-3">
                      <button type="submit" disabled={loading}
                        className="btn-main w-full flex items-center justify-center gap-2.5 bg-indigo-600 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 text-sm">
                        {loading
                          ? <><Loader2 size={17} className="animate-spin" /> Resetting…</>
                          : <><KeyRound size={17} /> Reset My Password <ArrowRight size={17} /></>
                        }
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP 4: Success ──────────────────────── */}
                {step === STEPS.SUCCESS && (
                  <div className="flex flex-col items-center gap-5 text-center">
                    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                      <p className="text-emerald-700 font-semibold text-sm mb-1">Password Updated!</p>
                      <p className="text-emerald-600 text-xs">
                        Your account is secured. You can now log in with your new password.
                      </p>
                    </div>
                    <button onClick={() => navigate("/login")}
                      className="btn-main w-full flex items-center justify-center gap-2.5 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 text-sm">
                      <Shield size={17} /> Go to Login <ArrowRight size={17} />
                    </button>
                    <p className="text-xs text-slate-400">
                      Need help?{" "}
                      <span className="text-blue-500 cursor-pointer hover:underline">Contact Support</span>
                    </p>
                  </div>
                )}

              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-500 font-semibold hover:underline underline-offset-2">
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
