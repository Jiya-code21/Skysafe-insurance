// import { useState } from 'react';
// import { MapPin, Zap, Shield, CheckCircle2 } from 'lucide-react';
// import { useAppContext } from '../context/AppContext';
// import { Card, Button, Badge } from '../components/ui';

// export default function PricingCalculator() {
//   const { coverageData, setCoverageData } = useAppContext();
  
//   const [coverageLevel, setCoverageLevel] = useState('standard'); 
  
//   const pricingOptions = {
//     basic: { name: 'Basic', amount: 3000, premium: 90, desc: 'Covers extreme events only.' },
//     standard: { name: 'Standard', amount: 5000, premium: 150, desc: 'Recommended for daily riders.' },
//     premium: { name: 'Premium', amount: 8000, premium: 240, desc: 'Maximum protection for full-time.' }
//   };

//   const handleUpdateCoverage = () => {
//     setCoverageData({
//       ...coverageData,
//       activeWeeklyCoverage: pricingOptions[coverageLevel].amount,
//       premiumPaid: pricingOptions[coverageLevel].premium,
//       weeklyPremiumCalc: pricingOptions[coverageLevel].premium,
//     });
//     alert('Coverage updated successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 pb-24 pt-6 px-6 animate-fade-in">
//       <h1 className="text-2xl font-bold text-blue-900 mb-2 mt-4">Quote Calculator</h1>
//       <p className="text-blue-900 mb-6">Customize your weekly protection plan.</p>

//       <Card className="mb-6 bg-white border-primary/20 shadow-md">
//         <div className="flex items-center gap-3 mb-4 border-b border-blue-200 pb-4">
//           <div className="bg-sky-100 w-10 h-10 flex items-center justify-center rounded-xl text-primary">
//             <MapPin size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-blue-900 leading-tight">Your Risk Zone</p>
//             <p className="font-bold text-blue-900 leading-tight mt-1">{coverageData.riskZone}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Zap className="text-blue-800" size={20} />
//             <span className="text-sm font-semibold text-blue-900">Dynamic Discount Applied</span>
//           </div>
//           <Badge type="info">-10% Safe Zone</Badge>
//         </div>
//       </Card>

//       <h2 className="text-lg font-bold text-blue-900 mb-4">Select Coverage</h2>
      
//       <div className="space-y-4 mb-8">
//         {Object.entries(pricingOptions).map(([key, plan]) => {
//           const isSelected = coverageLevel === key;
//           return (
//             <button
//               key={key}
//               onClick={() => setCoverageLevel(key)}
//               className={`w-full text-left rounded-2xl p-4 border-2 transition-all duration-300 relative ${
//                 isSelected 
//                   ? 'border-primary bg-sky-50 shadow-md' 
//                   : 'border-blue-200 bg-white hover:border-blue-200'
//               }`}
//             >
//               {isSelected && (
//                 <div className="absolute top-4 right-4 text-primary animate-slide-up">
//                   <CheckCircle2 size={24} className="fill-white" />
//                 </div>
//               )}
              
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-blue-900'}`}>
//                     {plan.name}
//                   </h3>
//                   <p className="text-blue-900 text-sm mt-1 w-5/6 leading-snug">{plan.desc}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-blue-900 mb-0 font-medium uppercase tracking-wider">Premium</p>
//                   <p className="font-bold text-2xl text-blue-900 mt-1">₹{plan.premium}<span className="text-sm text-blue-900 font-normal">/wk</span></p>
//                 </div>
//               </div>
              
//               <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between">
//                 <span className="text-sm font-semibold text-blue-900">Max Payout:</span>
//                 <span className="font-bold text-blue-900 flex items-center">
//                   ₹{plan.amount.toLocaleString()}
//                 </span>
//               </div>
//             </button>
//           )
//         })}
//       </div>

//       <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm mb-6 flex items-center gap-4">
//         <div className="bg-blue-100 p-2 rounded-xl">
//           <Shield className="text-blue-800" size={24} />
//         </div>
//         <div>
//           <p className="font-bold text-blue-900">Zero-Paperwork Guarantee</p>
//           <p className="text-xs text-blue-900 mt-1 leading-snug">Payouts use weather API triggers. No claim forms required.</p>
//         </div>
//       </div>

//       <Button onClick={handleUpdateCoverage} className="w-full text-lg shadow-xl shadow-primary/20">
//         Confirm Plan — ₹{pricingOptions[coverageLevel].premium}/wk
//       </Button>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { MapPin, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const pricingOptions = {
  basic: {
    name: 'Basic',
    amount: 3000,
    premium: 90,
    desc: 'Covers extreme events only.',
  },
  standard: {
    name: 'Standard',
    amount: 5000,
    premium: 150,
    desc: 'Recommended for daily riders.',
  },
  premium: {
    name: 'Premium',
    amount: 8000,
    premium: 240,
    desc: 'Maximum protection for full-time.',
  },
};

export default function PricingCalculator() {
  const { coverageData, setCoverageData } = useAppContext();
  const [coverageLevel, setCoverageLevel] = useState('standard');
  const [saved, setSaved] = useState(false);

  const handleUpdateCoverage = () => {
    const plan = pricingOptions[coverageLevel];
    setCoverageData({
      ...coverageData,
      activeWeeklyCoverage: plan.amount,
      premiumPaid: plan.premium,
      weeklyPremiumCalc: plan.premium,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Quote Calculator</h1>
        <p className="text-sm text-slate-500 mt-0.5">Customize your weekly protection plan.</p>
      </div>

      {/* Risk Zone Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-xl">
            <MapPin size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Your Risk Zone</p>
            <p className="font-bold text-slate-800">{coverageData.riskZone}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-blue-500" />
            <span className="text-sm font-semibold text-slate-700">Dynamic Discount Applied</span>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
            -10% Safe Zone
          </span>
        </div>
      </div>

      {/* Plan Selection */}
      <h2 className="text-base font-bold text-slate-800">Select Coverage</h2>
      <div className="space-y-3">
        {Object.entries(pricingOptions).map(([key, plan]) => {
          const isSelected = coverageLevel === key;
          return (
            <button
              key={key}
              onClick={() => setCoverageLevel(key)}
              className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 relative ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-200'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 size={22} className="text-blue-600" />
                </div>
              )}
              <div className="flex justify-between items-start mb-1 pr-8">
                <div>
                  <h3 className={`font-bold text-lg ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">{plan.desc}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Premium</p>
                  <p className="font-bold text-2xl text-slate-800">
                    ₹{plan.premium}
                    <span className="text-sm text-slate-400 font-normal">/wk</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Max Payout:</span>
                <span className="font-bold text-slate-800">₹{plan.amount.toLocaleString()}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Zero Paperwork Banner */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Shield size={22} className="text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">Zero-Paperwork Guarantee</p>
          <p className="text-xs text-slate-500 mt-0.5">Payouts via weather API triggers. No forms needed.</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleUpdateCoverage}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-base transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        {saved ? '✓ Plan Updated!' : `Confirm Plan — ₹${pricingOptions[coverageLevel].premium}/wk`}
      </button>
    </div>
  );
}
