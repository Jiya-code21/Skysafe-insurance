import React from 'react';
import PolicyCard from '../components/PolicyCard';
import DisruptionAlerts from '../components/DisruptionAlerts';
import { ShieldAlert, IndianRupee, AlertTriangle, FileText, Settings, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 pb-20">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-blue-200 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-darkBlue mb-0.5">Overview</h1>
          <p className="text-sm text-blue-900">Your active protection center</p>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-md text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            System Active
          </span>
        </div>
      </div>
      
      {/* Renewal Alert Banner */}
      <div className="bg-blue-50 border border-amber-200 rounded-bento p-4 flex items-start sm:items-center justify-between gap-4 shadow-sm">
         <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
               <AlertTriangle size={20} />
            </div>
            <div>
               <h4 className="text-brand-darkBlue font-semibold text-sm">Policy Renewal Required</h4>
               <p className="text-blue-900 text-xs mt-0.5">Your Gig Worker Income Protection expires in 12 days. Renew now to maintain uninterrupted coverage.</p>
            </div>
         </div>
         <button className="whitespace-nowrap bg-blue-50 hover:bg-blue-50 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors shadow-sm shrink-0">
            Renew Policy
         </button>
      </div>

      {/* Grid Layout for Policy Categories */}
      <div className="mt-2 text-brand-darkBlue font-display font-bold text-lg mb-1">Insurance Services</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/claims/new" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:bg-brand-darkBlue hover:border-brand-darkBlue transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-colors">
            <FileText size={24} />
          </div>
          <span className="font-semibold text-brand-darkBlue text-sm group-hover:text-white transition-colors">File Claim</span>
        </Link>
        <Link to="/claims" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:bg-brand-darkBlue hover:border-brand-darkBlue transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-colors">
            <ShieldAlert size={24} />
          </div>
          <span className="font-semibold text-brand-darkBlue text-sm group-hover:text-white transition-colors">Claim Status</span>
        </Link>
        <Link to="/analytics" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:bg-brand-darkBlue hover:border-brand-darkBlue transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-colors">
            <IndianRupee size={24} />
          </div>
          <span className="font-semibold text-brand-darkBlue text-sm group-hover:text-white transition-colors">Earnings setup</span>
        </Link>
        <Link to="/settings" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:bg-brand-darkBlue hover:border-brand-darkBlue transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-white text-blue-900 flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-colors">
            <Settings size={24} />
          </div>
          <span className="font-semibold text-brand-darkBlue text-sm group-hover:text-white transition-colors">Preferences</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2">
          <PolicyCard />
        </div>
        <div className="md:col-span-1">
          <DisruptionAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
