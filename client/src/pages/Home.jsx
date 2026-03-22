import React, { useState, useEffect } from 'react';
import {
  Shield, ArrowRight, Zap, Globe, ShieldCheck,
  CheckCircle2, Star, CloudRain, Thermometer, Wind,
  TrendingUp, Clock, Users, ChevronDown
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Inline CSS animations ─────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .home-root { font-family: 'DM Sans', sans-serif; }
  .font-sora { font-family: 'Sora', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-18px) rotate(1deg); }
    66%       { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-22px) rotate(-2deg); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 20px rgba(37,99,235,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up-delay1 {
    0%, 15%  { opacity: 0; transform: translateY(32px); }
    100%     { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up-delay2 {
    0%, 30%  { opacity: 0; transform: translateY(32px); }
    100%     { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up-delay3 {
    0%, 45%  { opacity: 0; transform: translateY(32px); }
    100%     { opacity: 1; transform: translateY(0); }
  }
  @keyframes badge-pop {
    0%   { opacity: 0; transform: scale(0.8) translateY(10px); }
    60%  { transform: scale(1.05) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes blob-drift {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes count-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-float   { animation: float 6s ease-in-out infinite; }
  .animate-float2  { animation: float2 8s ease-in-out infinite; }
  .animate-float3  { animation: float 7s ease-in-out infinite 2s; }
  .animate-pulse-ring { animation: pulse-ring 2.5s ease-in-out infinite; }
  .animate-blob    { animation: blob-drift 10s ease-in-out infinite; }
  .animate-blob2   { animation: blob-drift 14s ease-in-out infinite reverse; }

  .animate-hero-1  { animation: slide-up 0.7s ease forwards; }
  .animate-hero-2  { animation: slide-up-delay1 1s ease forwards; }
  .animate-hero-3  { animation: slide-up-delay2 1.2s ease forwards; }
  .animate-hero-4  { animation: slide-up-delay3 1.4s ease forwards; }
  .animate-badge   { animation: badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both; }

  .shimmer-text {
    background: linear-gradient(90deg, #1d4ed8, #2563eb, #0ea5e9, #2563eb, #1d4ed8);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .glass {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.8);
  }
  .glass-dark {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.6);
  }

  .card-hover {
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 24px 48px -8px rgba(37,99,235,0.15);
  }

  .btn-primary-xl {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-primary-xl::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .btn-primary-xl:hover::before { opacity: 1; }
  .btn-primary-xl:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 20px 40px -8px rgba(37,99,235,0.5); }
  .btn-primary-xl:active { transform: translateY(0) scale(0.98); }

  .ticker-wrap { overflow: hidden; }
  .ticker { display: flex; animation: ticker 30s linear infinite; white-space: nowrap; }
  .ticker:hover { animation-play-state: paused; }

  .mesh-bg {
    background:
      radial-gradient(ellipse at 20% 20%, rgba(37,99,235,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(14,165,233,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%),
      linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0fbff 100%);
  }

  .section-fade {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .section-fade.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .stat-card {
    position: relative;
    overflow: hidden;
  }
  .stat-card::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`;

/* ─── Floating Weather Card ──────────────────────────────────────── */
const WeatherCard = ({ icon: Icon, label, value, color, delay = '0s' }) => (
  <div
    className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
    style={{ animationDelay: delay }}
  >
    <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium leading-none mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

/* ─── Scroll observer hook ───────────────────────────────────────── */
const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ─── Main Component ─────────────────────────────────────────────── */
const Home = () => {
  const { user, loading } = useAuth();
  const [navScrolled, setNavScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  const tickerItems = [
    '⚡ Instant Payouts', '🌧️ Rain Protection', '🔥 Heat Wave Cover',
    '🚫 Curfew Claims', '🛵 Zomato & Swiggy', '📦 E-commerce Riders',
    '🛒 Grocery Delivery', '✅ Zero Paperwork', '⚡ Instant Payouts',
    '🌧️ Rain Protection', '🔥 Heat Wave Cover', '🚫 Curfew Claims',
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="home-root min-h-screen flex flex-col mesh-bg overflow-x-hidden">

        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-3'
            : 'py-5'
        }`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="animate-pulse-ring w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-300">
                <Shield size={20} className="text-white" />
              </div>
              <span className="font-sora text-xl font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 glass rounded-2xl px-2 py-1.5">
              {['#features', '#how', '#pricing'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                  {['Features', 'How it Works', 'Pricing'][i]}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary-xl flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-300"
              >
                Get Started <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">

          {/* Animated blob backgrounds */}
          <div className="animate-blob absolute top-20 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="animate-blob2 absolute bottom-20 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="animate-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

          {/* Floating cards — decorative */}
          <div className="animate-float absolute left-4 md:left-16 top-1/3 hidden sm:block">
            <WeatherCard icon={CloudRain} label="Heavy Rain" value="Triggered" color="bg-blue-500" />
          </div>
          <div className="animate-float2 absolute right-4 md:right-16 top-1/4 hidden sm:block">
            <WeatherCard icon={Thermometer} label="Heat Wave" value="45°C Alert" color="bg-orange-500" />
          </div>
          <div className="animate-float3 absolute right-4 md:right-24 bottom-1/4 hidden lg:block">
            <WeatherCard icon={TrendingUp} label="Payout Sent" value="₹1,200" color="bg-emerald-500" />
          </div>

          {/* Badge */}
          <div className="animate-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-100 text-blue-700 text-sm font-bold mb-8 shadow-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Live Parametric Insurance Platform
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          </div>

          {/* Headline */}
          <h1 className="animate-hero-1 font-sora text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] max-w-4xl mx-auto tracking-tight text-slate-900 mb-6">
            Income protection{' '}
            <span className="shimmer-text">as instant</span>
            <br />as your deliveries.
          </h1>

          {/* Subheading */}
          <p className="animate-hero-2 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            SkySafe automatically pays gig workers when bad weather, curfews, or disruptions
            stop them from earning — <span className="font-semibold text-slate-700">zero forms, zero waiting</span>.
          </p>

          {/* CTA Buttons */}
          <div className="animate-hero-3 flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="btn-primary-xl flex items-center justify-center gap-2.5 bg-blue-600 text-white font-bold px-9 py-4 rounded-2xl text-base shadow-xl shadow-blue-300"
            >
              <Shield size={18} />
              Start Free — Get Protected
              <ArrowRight size={18} />
            </Link>
            <a
              href="#how"
              className="flex items-center justify-center gap-2 glass hover:bg-white text-slate-700 font-semibold px-8 py-4 rounded-2xl text-base transition-all border border-slate-200 hover:border-blue-200 hover:shadow-md"
            >
              Watch How It Works
              <ChevronDown size={16} className="animate-bounce" />
            </a>
          </div>

          {/* Social proof */}
          <div className="animate-hero-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { bg: 'bg-blue-500',   l: 'R' },
                  { bg: 'bg-sky-500',    l: 'A' },
                  { bg: 'bg-indigo-500', l: 'S' },
                  { bg: 'bg-blue-700',   l: 'M' },
                  { bg: 'bg-cyan-500',   l: 'K' },
                ].map(({ bg, l }) => (
                  <div key={l} className={`w-9 h-9 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">2,400+ workers</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                  <span className="text-xs text-slate-500 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors">
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </section>

        {/* ── TICKER ─────────────────────────────────────────────── */}
        <div className="ticker-wrap py-4 bg-blue-600 overflow-hidden">
          <div className="ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-white/90 font-semibold text-sm px-8">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <section id="stats" className="relative z-10 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="section-fade grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { icon: TrendingUp, value: '₹37,300+', label: 'Income Protected',   color: 'bg-blue-600',   shadow: 'shadow-blue-200' },
                { icon: Zap,        value: '₹1,750+',  label: 'Payouts Delivered',  color: 'bg-sky-500',    shadow: 'shadow-sky-200' },
                { icon: Users,      value: '2,400+',   label: 'Workers Protected',  color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
                { icon: Clock,      value: '<2 min',   label: 'Avg Payout Time',    color: 'bg-emerald-500',shadow: 'shadow-emerald-200' },
              ].map(({ icon: Icon, value, label, color, shadow }) => (
                <div key={label} className="stat-card glass rounded-2xl p-6 text-center shadow-sm hover:shadow-md card-hover">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4 shadow-lg ${shadow}`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="font-sora text-2xl font-extrabold text-slate-800 mb-1">{value}</p>
                  <p className="text-xs text-slate-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────── */}
        <section id="how" className="relative z-10 py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="section-fade text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
                <Zap size={12} /> How It Works
              </span>
              <h2 className="font-sora text-4xl md:text-5xl font-extrabold text-slate-800 mt-5 mb-4 tracking-tight">
                Payout in{' '}
                <span className="shimmer-text">three steps</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                From signup to automatic payout — no human intervention needed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector */}
              <div className="hidden md:block absolute top-12 left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

              {[
                {
                  step: '01', icon: Shield, color: 'bg-blue-600', glow: 'shadow-blue-300',
                  title: 'Sign Up in 2 Minutes',
                  desc: 'Create your account, enter your city, and pick a weekly plan. Done.',
                  tag: 'Takes 2 min',
                },
                {
                  step: '02', icon: Globe, color: 'bg-sky-500', glow: 'shadow-sky-300',
                  title: 'We Monitor Your Zone',
                  desc: 'Our system watches live weather APIs, curfew alerts, and disruptions 24/7.',
                  tag: 'Always on',
                },
                {
                  step: '03', icon: Zap, color: 'bg-indigo-600', glow: 'shadow-indigo-300',
                  title: 'Get Paid Instantly',
                  desc: 'Trigger fires → money hits your account. No forms, no calls, no stress.',
                  tag: 'Under 2 min',
                },
              ].map(({ step, icon: Icon, color, glow, title, desc, tag }) => (
                <div key={step} className="section-fade relative z-10 glass rounded-3xl p-8 card-hover shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-xl ${glow}`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <span className="font-sora text-5xl font-extrabold text-slate-100">{step}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{tag}</span>
                    <h3 className="font-sora text-xl font-bold text-slate-800 mt-3 mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ───────────────────────────────────────────── */}
        <section id="features" className="relative z-10 py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 skew-y-2 origin-top-left scale-105 pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="section-fade text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                Features
              </span>
              <h2 className="font-sora text-4xl md:text-5xl font-extrabold text-white mt-5 mb-4 tracking-tight">
                Built different.
              </h2>
              <p className="text-blue-100 max-w-xl mx-auto">
                Traditional insurance makes you wait weeks. We pay in minutes.
              </p>
            </div>

            <div className="section-fade grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap, iconBg: 'bg-yellow-400/20', iconColor: 'text-yellow-300',
                  border: 'border-yellow-400/20',
                  title: 'Zero Paperwork',
                  desc: 'Everything is automated. Weather API triggers your claim. You just receive money.',
                  points: ['Auto-validated triggers', 'No forms ever', 'Instant bank credit'],
                },
                {
                  icon: Globe, iconBg: 'bg-sky-400/20', iconColor: 'text-sky-300',
                  border: 'border-sky-400/20',
                  title: 'Hyper-Local Data',
                  desc: 'We track weather and disruptions at the city level — not just national averages.',
                  points: ['City-level precision', 'Live OpenWeather API', '24/7 monitoring'],
                },
                {
                  icon: ShieldCheck, iconBg: 'bg-emerald-400/20', iconColor: 'text-emerald-300',
                  border: 'border-emerald-400/20',
                  title: 'Guaranteed Funds',
                  desc: 'Backed by A-rated reinsurance. Your payout is guaranteed when conditions are met.',
                  points: ['A-rated reinsurance', 'Up to ₹8,000/week', 'No claim rejections'],
                },
              ].map(({ icon: Icon, iconBg, iconColor, border, title, desc, points }) => (
                <div key={title} className={`rounded-3xl p-7 border ${border} bg-white/10 backdrop-blur-sm card-hover flex flex-col gap-4`}>
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <div>
                    <h3 className="font-sora text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-sm text-blue-100 leading-relaxed mb-4">{desc}</p>
                    <ul className="space-y-2">
                      {points.map(pt => (
                        <li key={pt} className="flex items-center gap-2 text-sm text-blue-50">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ────────────────────────────────────────────── */}
        <section id="pricing" className="relative z-10 py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="section-fade text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
                Pricing
              </span>
              <h2 className="font-sora text-4xl md:text-5xl font-extrabold text-slate-800 mt-5 mb-4 tracking-tight">
                One price. Full protection.
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Weekly plans. No annual commitments. No hidden fees.
              </p>
            </div>

            <div className="section-fade grid md:grid-cols-3 gap-6 items-center">
              {[
                {
                  name: 'Basic', price: 90, coverage: '3,000',
                  desc: 'Part-time workers', highlight: false,
                  features: ['Extreme events only', 'Email alerts', 'Basic support'],
                },
                {
                  name: 'Standard', price: 150, coverage: '5,000',
                  desc: 'Recommended for daily riders', highlight: true,
                  features: ['All weather events', 'Instant payout', 'SMS alerts', 'Priority support'],
                },
                {
                  name: 'Premium', price: 240, coverage: '8,000',
                  desc: 'Full-time professionals', highlight: false,
                  features: ['Everything in Standard', 'Curfew cover', 'Dedicated manager'],
                },
              ].map(({ name, price, coverage, desc, highlight, features }) => (
                <div
                  key={name}
                  className={`rounded-3xl p-8 flex flex-col card-hover relative overflow-hidden ${
                    highlight
                      ? 'bg-blue-600 text-white shadow-2xl shadow-blue-300 scale-105 z-10'
                      : 'glass shadow-sm'
                  }`}
                >
                  {highlight && (
                    <>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <span className="relative z-10 text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1.5 rounded-full w-fit mb-4">
                        ⭐ Most Popular
                      </span>
                    </>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{desc}</p>
                  <h3 className={`font-sora text-2xl font-extrabold mb-1 ${highlight ? 'text-white' : 'text-slate-800'}`}>{name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-sora text-5xl font-extrabold ${highlight ? 'text-white' : 'text-slate-800'}`}>₹{price}</span>
                    <span className={`text-sm font-medium ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>/week</span>
                  </div>
                  <p className={`text-sm mb-7 ${highlight ? 'text-blue-100' : 'text-slate-400'}`}>
                    Up to ₹{coverage} coverage
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 size={16} className={highlight ? 'text-blue-200' : 'text-blue-500'} />
                        <span className={highlight ? 'text-blue-50' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`btn-primary-xl w-full text-center py-3.5 rounded-2xl font-bold text-sm transition-all ${
                      highlight
                        ? 'bg-white text-blue-600 shadow-lg hover:bg-blue-50'
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────── */}
        <section className="relative z-10 py-20 px-4 mb-8">
          <div className="max-w-3xl mx-auto section-fade">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700" />
              <div className="absolute inset-0 opacity-30"
                style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)'}}
              />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px'}}
              />

              <div className="relative z-10 p-12 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Shield size={30} className="text-white" />
                </div>
                <h2 className="font-sora text-4xl font-extrabold text-white mb-4">
                  Ready to stop worrying?
                </h2>
                <p className="text-blue-100 mb-10 max-w-lg mx-auto text-base">
                  Join 2,400+ gig workers protected by SkySafe. Setup takes 2 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="btn-primary-xl flex items-center justify-center gap-2.5 bg-white text-blue-600 font-bold px-9 py-4 rounded-2xl shadow-2xl text-base"
                  >
                    <Shield size={18} />
                    Create Free Account
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 transition-all text-base backdrop-blur-sm"
                  >
                    Already have account? Sign In
                  </Link>
                </div>
                <p className="text-blue-200/70 text-xs mt-6">
                  No credit card • Cancel anytime • Instant activation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="relative z-10 border-t border-slate-100 py-8 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                <Shield size={15} className="text-white" />
              </div>
              <span className="font-sora font-bold text-slate-800">
                Sky<span className="text-blue-600">Safe</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">© 2026 SkySafe Inc. Parametric Insurance Platform.</p>
            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Support'].map(item => (
                <span key={item} className="text-xs text-slate-400 hover:text-blue-600 cursor-pointer transition-colors font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;