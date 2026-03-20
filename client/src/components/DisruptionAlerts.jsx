import React from 'react';
import { CloudRain, ThermometerSun, AlertTriangle, ShieldAlert } from 'lucide-react';

const alerts = [
  { id: 1, type: 'Heavy Rain', status: 'active', color: 'bg-brand-darkBlue/20 text-brand-darkBlue border-brand-darkBlue/50 shadow-sm', icon: CloudRain },
  { id: 2, type: 'Extreme Heat', status: 'monitoring', color: 'bg-white/5 text-white/80 border-white/10', icon: ThermometerSun },
  { id: 3, type: 'Local Curfew', status: 'clear', color: 'bg-white/5 text-white/40 border-white/5', icon: ShieldAlert },
];

const DisruptionAlerts = () => {
  return (
    <div className="glass-card p-6 flex flex-col gap-5 h-full relative overflow-hidden bg-black/40">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-darkBlue/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Live Disruption Monitor
          <span className="w-2 h-2 rounded-full bg-brand-darkBlue animate-pulse block"></span>
        </h2>
        <p className="text-sm text-white/50 mt-1">Real-time parametric triggers scanning.</p>
      </div>

      <div className="flex flex-col gap-3 flex-grow justify-center">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const isActive = alert.status === 'active';
          
          return (
            <div 
              key={alert.id} 
              className={`backdrop-blur-md rounded-xl p-4 flex items-center justify-between border transition-all duration-300 ${alert.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-darkBlue/20' : 'bg-black/30'}`}>
                   <Icon size={20} />
                </div>
                <span className={`font-semibold text-sm ${isActive ? 'text-white' : ''}`}>{alert.type}</span>
              </div>
              
              {isActive ? (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-darkBlue text-black px-2 py-1 rounded-md shadow-[0_0_10px_rgba(255,191,0,0.5)]">
                  Triggered
                </span>
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                  {alert.status}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisruptionAlerts;

