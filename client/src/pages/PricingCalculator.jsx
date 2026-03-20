import { useState } from 'react';
import { MapPin, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Badge } from '../components/ui';

export default function PricingCalculator() {
  const { coverageData, setCoverageData } = useAppContext();
  
  const [coverageLevel, setCoverageLevel] = useState('standard'); 
  
  const pricingOptions = {
    basic: { name: 'Basic', amount: 3000, premium: 90, desc: 'Covers extreme events only.' },
    standard: { name: 'Standard', amount: 5000, premium: 150, desc: 'Recommended for daily riders.' },
    premium: { name: 'Premium', amount: 8000, premium: 240, desc: 'Maximum protection for full-time.' }
  };

  const handleUpdateCoverage = () => {
    setCoverageData({
      ...coverageData,
      activeWeeklyCoverage: pricingOptions[coverageLevel].amount,
      premiumPaid: pricingOptions[coverageLevel].premium,
      weeklyPremiumCalc: pricingOptions[coverageLevel].premium,
    });
    alert('Coverage updated successfully!');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-24 pt-6 px-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-blue-900 mb-2 mt-4">Quote Calculator</h1>
      <p className="text-blue-900 mb-6">Customize your weekly protection plan.</p>

      <Card className="mb-6 bg-white border-primary/20 shadow-md">
        <div className="flex items-center gap-3 mb-4 border-b border-blue-200 pb-4">
          <div className="bg-sky-100 w-10 h-10 flex items-center justify-center rounded-xl text-primary">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm text-blue-900 leading-tight">Your Risk Zone</p>
            <p className="font-bold text-blue-900 leading-tight mt-1">{coverageData.riskZone}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-800" size={20} />
            <span className="text-sm font-semibold text-blue-900">Dynamic Discount Applied</span>
          </div>
          <Badge type="info">-10% Safe Zone</Badge>
        </div>
      </Card>

      <h2 className="text-lg font-bold text-blue-900 mb-4">Select Coverage</h2>
      
      <div className="space-y-4 mb-8">
        {Object.entries(pricingOptions).map(([key, plan]) => {
          const isSelected = coverageLevel === key;
          return (
            <button
              key={key}
              onClick={() => setCoverageLevel(key)}
              className={`w-full text-left rounded-2xl p-4 border-2 transition-all duration-300 relative ${
                isSelected 
                  ? 'border-primary bg-sky-50 shadow-md' 
                  : 'border-blue-200 bg-white hover:border-blue-200'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-primary animate-slide-up">
                  <CheckCircle2 size={24} className="fill-white" />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-blue-900'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-blue-900 text-sm mt-1 w-5/6 leading-snug">{plan.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-900 mb-0 font-medium uppercase tracking-wider">Premium</p>
                  <p className="font-bold text-2xl text-blue-900 mt-1">₹{plan.premium}<span className="text-sm text-blue-900 font-normal">/wk</span></p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-900">Max Payout:</span>
                <span className="font-bold text-blue-900 flex items-center">
                  ₹{plan.amount.toLocaleString()}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm mb-6 flex items-center gap-4">
        <div className="bg-blue-100 p-2 rounded-xl">
          <Shield className="text-blue-800" size={24} />
        </div>
        <div>
          <p className="font-bold text-blue-900">Zero-Paperwork Guarantee</p>
          <p className="text-xs text-blue-900 mt-1 leading-snug">Payouts use weather API triggers. No claim forms required.</p>
        </div>
      </div>

      <Button onClick={handleUpdateCoverage} className="w-full text-lg shadow-xl shadow-primary/20">
        Confirm Plan — ₹{pricingOptions[coverageLevel].premium}/wk
      </Button>
    </div>
  );
}
