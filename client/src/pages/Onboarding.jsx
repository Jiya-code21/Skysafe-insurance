import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, Navigation2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const segments = [
  { id: 'food', icon: '🛵', label: 'Food Delivery', desc: 'Zomato, Swiggy, etc.' },
  { id: 'grocery', icon: '🛒', label: 'Grocery (10 Min)', desc: 'Zepto, Blinkit, Instamart' },
  { id: 'ecommerce', icon: '📦', label: 'E-commerce', desc: 'Amazon, Flipkart, Myntra' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-lg mx-auto w-full">
      <div className="relative mb-12 flex justify-center w-full">
        {/* Glowing Orb Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/30 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="glass-card p-6 rounded-full border border-blue-200 relative z-10 shadow-[0_0_30px_rgba(0,98,255,0.2)] bg-white">
          <Shield size={48} className="text-brand-blue" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight text-brand-darkBlue drop-shadow-md">
        Welcome to Sky<span className="text-brand-blue">Safe</span>
      </h1>
      <p className="text-lg text-blue-500 text-center mb-10 w-full max-w-sm mx-auto">
        Your AI-powered safety net against bad weather and local disruptions.
      </p>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full glass-card p-6 md:p-8 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
            <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold font-display">1</span>
            <h2 className="text-xl font-semibold text-blue-900">Select Your Segment</h2>
          </div>

          <div className="grid gap-4">
            {segments.map((seg) => (
              <button 
                key={seg.id}
                onClick={() => setSelectedSegment(seg.id)}
                className={`p-4 rounded-xl flex items-center justify-between border transition-all duration-300 ${
                  selectedSegment === seg.id 
                  ? 'bg-brand-blue/20 border-brand-blue/50 shadow-[0_0_15px_rgba(0,98,255,0.2)]'
                  : 'bg-white border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl">{seg.icon}</span>
                  <div>
                    <h3 className="font-semibold text-blue-900">{seg.label}</h3>
                    <p className="text-xs text-blue-500">{seg.desc}</p>
                  </div>
                </div>
                {selectedSegment === seg.id && <CheckCircle2 size={20} className="text-brand-blue" />}
              </button>
            ))}
          </div>

          <button 
            onClick={() => selectedSegment && setStep(2)}
            disabled={!selectedSegment}
            className={`mt-2 btn-primary w-full ${!selectedSegment ? 'opacity-50 cursor-not-allowed shadow-none hover:bg-brand-blue' : ''}`}
          >
            Continue <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full glass-card p-6 md:p-8 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
            <span className="w-8 h-8 rounded-full bg-brand-darkBlue/20 text-brand-darkBlue flex items-center justify-center font-bold font-display cursor-pointer" onClick={() => setStep(1)}>
              <span className="text-xs">←</span>
            </span>
            <h2 className="text-xl font-semibold text-blue-900">Activate Safety Net</h2>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center justify-center text-center gap-4">
            <Navigation2 size={40} className="text-brand-blue animate-bounce" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-1">Building Risk Profile</h3>
              <p className="text-sm text-blue-600">We monitor live API data (weather, news) relative to your working zones to calculate payouts.</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary w-full bg-brand-blue shadow-sm"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

    </div>
  );
};

export default Onboarding;

