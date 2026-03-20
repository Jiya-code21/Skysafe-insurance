import React from 'react';
import { ShieldCheck, CalendarRange } from 'lucide-react';

const PolicyCard = () => {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 border-t border-l border-white/20">
      
      {/* Background glow effects */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-blue/30 rounded-full blur-[80px] z-0"></div>
      
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-3 inline-block">
            Control Center
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Weekly Policy Active</h2>
          <p className="text-sm text-white/60 flex items-center gap-2">
            <CalendarRange size={16} /> Auto-renews in 5 days
          </p>
        </div>
        <div className="glass-card bg-white/5 border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-blue" />
          <span className="text-sm font-semibold text-white">Full Protection</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4 z-10">
        <div className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col">
          <span className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">Weekly Premium</span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-display font-bold text-white tracking-tighter">₹45</span>
            <span className="text-sm text-white/40 font-medium">/ week</span>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col">
           <span className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">Target Income Protected</span>
           <div className="flex items-baseline gap-1">
             <span className="text-5xl font-display font-bold text-brand-blue tracking-tighter">₹4,000</span>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-2 z-10">
        <p className="text-sm font-medium text-white/40">Only loss-of-income covered.</p>
        <button className="btn-glass px-6 shadow-none">Manage Coverage</button>
      </div>
    </div>
  );
};

export default PolicyCard;
