import React from 'react';
import { CheckCircle2, Zap, BrainCircuit, Activity } from 'lucide-react';

const claimsData = [
  {
    id: 'CLM-9091',
    date: '15 Mar 2026',
    trigger: 'Extreme Heat Alert (45°C+)',
    amount: '₹500',
    status: 'Instant Payout Processed',
  },
  {
    id: 'CLM-8442',
    date: '02 Feb 2026',
    trigger: 'Heavy Rain / Flooding',
    amount: '₹850',
    status: 'Instant Payout Processed',
  },
  {
    id: 'CLM-8110',
    date: '12 Jan 2026',
    trigger: 'Local Curfew / Road Block',
    amount: '₹400',
    status: 'AI Validation',
  }
];

const Claims = () => {
  return (
    <div className="flex flex-col gap-8 pb-20 max-w-4xl mx-auto w-full">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Automated Claims</h1>
        <p className="text-sm font-medium text-white/50 mt-1">Zero-Touch resolution timeline.</p>
      </div>

      <div className="bg-brand-blue/10 text-white glass-card p-8 flex items-center gap-6 border-brand-blue/30 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-blue/30 rounded-full blur-[60px] pointer-events-none"></div>
        <Zap size={48} className="text-brand-blue" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-1">Instant Parametric Payouts</h2>
          <p className="font-medium text-white/60">Our system automatically validates external data sources. When a trigger condition is met in your active zone, funds are instantly credited to cover your lost daily wages.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {claimsData.map((claim, idx) => (
          <div key={claim.id} className="glass-card p-6 border-l-4 border-l-brand-blue">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="bg-white/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide border border-brand-blue/20">{claim.date}</span>
                <h3 className="text-xl font-bold text-white mt-3">{claim.trigger}</h3>
                <p className="text-white/40 font-medium text-sm mt-1">Ref ID: {claim.id}</p>
              </div>
              <div className="text-2xl font-display font-bold text-brand-darkBlue">+{claim.amount}</div>
            </div>

            {/* Glowing Timeline progress */}
            <div className="relative pt-4">
              <div className="absolute top-6 left-0 w-full h-[2px] bg-white/10 z-0"></div>
              
              <div className="flex justify-between relative z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue border-2 border-dark-bg flex items-center justify-center shadow-sm">
                    <Activity size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold uppercase text-brand-blue tracking-wider text-center max-w-[100px]">Disruption Detected</span>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark-bg transition-colors ${claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'bg-brand-blue shadow-sm' : 'bg-white/20'}`}>
                    <BrainCircuit size={12} className={claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'text-white' : 'text-white/50'} />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider text-center max-w-[100px] ${claim.status === 'Instant Payout Processed' || claim.status === 'AI Validation' ? 'text-brand-blue' : 'text-white/30'}`}>AI Validation</span>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark-bg transition-colors ${claim.status === 'Instant Payout Processed' ? 'bg-brand-blue shadow-sm' : 'bg-white/20'}`}>
                    {claim.status === 'Instant Payout Processed' && <CheckCircle2 size={12} className="text-black" />}
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider text-center max-w-[100px] ${claim.status === 'Instant Payout Processed' ? 'text-brand-blue' : 'text-white/30'}`}>Instant Payout Processed</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Claims;

