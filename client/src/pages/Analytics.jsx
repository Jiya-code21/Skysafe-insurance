// import React from 'react';
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Jan', protected: 12000, payout: 400 },
//   { name: 'Feb', protected: 15500, payout: 850 },
//   { name: 'Mar', protected: 9800,  payout: 500 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="glass-card bg-black/80 backdrop-blur-xl border border-white/20 p-4 shadow-glass">
//         <p className="font-bold text-white/50 uppercase mb-2 text-xs tracking-widest">{label}</p>
//         <p className="font-semibold text-brand-blue flex items-center gap-2">
//           <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
//           Protected: ₹{payload[0].value}
//         </p>
//         <p className="font-semibold text-brand-darkBlue flex items-center gap-2 mt-1">
//           <span className="w-2 h-2 rounded-full bg-brand-darkBlue"></span>
//           Payouts: ₹{payload[1].value}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// const Analytics = () => {
//   return (
//     <div className="flex flex-col gap-6 pb-20 max-w-5xl mx-auto w-full">
//       <div className="border-b border-white/10 pb-4">
//         <h1 className="text-4xl font-bold tracking-tight text-white">Worker Earnings Dashboard</h1>
//         <p className="text-sm font-medium text-white/50 mt-1">Professional analytics of your loss-of-income safety net.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="glass-card bg-brand-blue/10 p-6 text-white border-brand-blue/20 shadow-sm relative overflow-hidden">
//           <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-[40px] pointer-events-none"></div>
//           <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-2">Total Income Protected</h3>
//           <p className="text-5xl font-display font-bold drop-shadow-md">₹37,300</p>
//         </div>
        
//         <div className="glass-card bg-brand-darkBlue/10 p-6 text-white border-brand-darkBlue/20 shadow-sm relative overflow-hidden">
//           <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-darkBlue/20 rounded-full blur-[40px] pointer-events-none"></div>
//           <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-darkBlue mb-2">Instant Payouts Received</h3>
//           <p className="text-5xl font-display font-bold drop-shadow-md">₹1,750</p>
//         </div>
//       </div>

//       <div className="glass-card p-6 h-96 mt-4 relative">
//         <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Monthly Value Trajectory</h2>
//         <ResponsiveContainer width="100%" height="80%">
//           <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorProtected" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#0062ff" stopOpacity={0.4}/>
//                 <stop offset="95%" stopColor="#0062ff" stopOpacity={0}/>
//               </linearGradient>
//               <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#FFBF00" stopOpacity={0.4}/>
//                 <stop offset="95%" stopColor="#FFBF00" stopOpacity={0}/>
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
//             <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Area type="monotone" dataKey="protected" stroke="#0062ff" strokeWidth={3} fillOpacity={1} fill="url(#colorProtected)" />
//             <Area type="monotone" dataKey="payout" stroke="#FFBF00" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout)" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="glass-card bg-white/5 p-6 border-white/10 mt-2">
//         <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-2">Platform Insight</h3>
//         <p className="text-sm text-white/70 leading-relaxed">The high-fidelity safety net algorithm ensures that for every localized disruption (e.g. Extreme Heat warnings issued by government bodies), corresponding loss-of-income limits are proactively dispersed with zero paperwork required.</p>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', protected: 12000, payout: 400 },
  { name: 'Feb', protected: 15500, payout: 850 },
  { name: 'Mar', protected: 9800,  payout: 500 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-sm">
        <p className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">{label}</p>
        <p className="font-semibold text-blue-600">Protected: ₹{payload[0]?.value?.toLocaleString()}</p>
        <p className="font-semibold text-emerald-500 mt-1">Payout: ₹{payload[1]?.value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  return (
    <div className="space-y-6 pb-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Your income protection overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-white" />
          </div>
          <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">Total Income Protected</p>
          <p className="text-4xl font-bold">₹37,300</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full" />
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign size={20} className="text-emerald-600" />
          </div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Instant Payouts Received</p>
          <p className="text-4xl font-bold text-slate-800">₹1,750</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-6">Monthly Value Trajectory</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProtected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="protected"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorProtected)"
            />
            <Area
              type="monotone"
              dataKey="payout"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPayout)"
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex items-center gap-5 mt-4 justify-center">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="w-3 h-3 rounded-full bg-blue-500" /> Income Protected
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> Payouts
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-blue-700 mb-1.5">Platform Insight</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          For every localized disruption — such as extreme heat warnings — corresponding loss-of-income limits are
          proactively dispersed with zero paperwork required.
        </p>
      </div>
    </div>
  );
};

export default Analytics;

