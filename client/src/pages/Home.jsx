import React from 'react';
import { Shield, ArrowRight, Zap, Globe, ShieldCheck } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If already logged in, no need to see landing page
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900 font-sans overflow-x-hidden">
      
      {/* Navbar Minimal */}
      <nav className="mx-auto max-w-7xl w-full px-6 py-4 flex items-center justify-between relative z-50">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Shield size={20} className="text-brand-blue" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Sky<span className="text-brand-blue">Safe</span>
          </span>
        </Link>
        <Link to="/login" className="btn-glass text-sm">Sign In</Link>
      </nav>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 relative z-10 pt-12 pb-24">
        
        {/* Hero Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-semibold mb-8 backdrop-blur-md">
           <Zap size={16} /> Instant Parametric Payouts
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight max-w-4xl mx-auto tracking-tight mb-6">
          Insurance that works <br className="hidden md:block"/> as fast as you do.
        </h1>
        
        <p className="text-lg md:text-xl text-blue-900 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          SkySafe provides gig workers with automated, zero-touch income protection against severe weather, disruptions, and unexpected downtime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="btn-primary !py-4 !px-8 text-lg">
            Get Protected Now <ArrowRight size={20} />
          </Link>
          <button className="btn-glass !py-4 !px-8 text-lg">
            View Coverage Plans
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto w-full text-left">
           <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-6">
                 <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero Paperwork</h3>
              <p className="text-blue-900">Claims are triggered and validated automatically using real-time API data sources.</p>
           </div>
           
           <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-6">
                 <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Hyper-Local Tracking</h3>
              <p className="text-blue-900">Our system maps disruptions precisely to your current working zone for accurate payouts.</p>
           </div>
           
           <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-darkBlue/20 text-brand-darkBlue flex items-center justify-center mb-6">
                 <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Guaranteed Protection</h3>
              <p className="text-blue-900">Backed by A-rated reinsurance so you know the funds will always be there when needed most.</p>
           </div>
        </div>

      </main>
    </div>
  );
};

export default Home;

