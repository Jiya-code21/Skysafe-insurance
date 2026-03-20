import { Home, Calculator, ShieldAlert, BarChart3 } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  if (location.pathname === '/' && !localStorage.getItem('onboarded')) {
    // We will handle hiding nav on onboarding page safely, 
    // but better to hide it fully here if needed. 
    // For now we assume if onboarding is shown, it's full screen.
  }

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/pricing', label: 'Quote', icon: Calculator },
    { to: '/claims', label: 'Claims', icon: ShieldAlert },
    { to: '/analytics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-200 px-6 py-3 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-blue-900 hover:text-blue-900'}`
              }
            >
              <Icon size={24} strokeWidth={2.5} />
              <span className="text-[10px] font-semibold tracking-wide uppercase mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
