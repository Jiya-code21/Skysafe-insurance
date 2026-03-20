import React, { useState } from 'react';
import { Shield, ChevronDown, User, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Policies', path: '/dashboard' }, // We'll map My Policies to Dashboard for now or a new page
  { name: 'Claims', path: '/claims' },
];

const Header = () => {
  const [partner, setPartner] = useState('zomato');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-blue-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
        <div className="flex items-center justify-between relative z-10 p-2">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 rounded-lg bg-brand-blue p-0.5 shadow-sm transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
                  {/* Assuming logo.png is provided, fallback to Shield if missing */}
                  <img 
                    src="/logo.png" 
                    alt="SkySafe Logo" 
                    className="w-full h-full object-contain p-1 rounded-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <Shield size={20} className="text-brand-blue hidden" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-darkBlue hidden sm:block">
                Sky<span className="text-brand-blue">Safe</span>
              </span>
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname.includes(link.path) || 
                              (link.path === '/dashboard' && location.pathname === '/');
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    "text-sm font-semibold transition-all duration-300 pb-1 border-b-2",
                    isActive 
                      ? "text-brand-blue border-brand-blue" 
                      : "text-blue-900 border-transparent hover:text-brand-darkBlue hover:border-brand-darkBlue"
                  )}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Section: Segment Control & Account */}
          <div className="flex items-center gap-3">
            
            {/* Segment Control */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-brand-blue font-semibold uppercase tracking-wider mb-0.5 px-1">Risk Profile</span>
              <div className="relative group">
                <select 
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  className="bg-blue-50 border border-blue-200 hover:border-brand-darkBlue text-brand-darkBlue text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 appearance-none focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all cursor-pointer shadow-sm"
                >
                  <option value="zomato" className="bg-white">🍒 Food Delivery</option>
                  <option value="swiggy" className="bg-white">🥡 Groceries</option>
                  <option value="zepto" className="bg-white">🛒 E-Commerce</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-900 pointer-events-none group-hover:text-brand-darkBlue transition-colors" />
              </div>
            </div>

            {/* Account Avatar Dropdown */}
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border border-blue-200 p-0.5 overflow-hidden focus:outline-none shadow-sm hover:border-brand-darkBlue transition-colors bg-white mt-1 group"
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-brand-blue font-bold text-sm group-hover:bg-brand-darkBlue group-hover:text-white transition-colors">
                  {user?.initials || <User size={18} />}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-blue-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="px-4 py-2 border-b border-blue-200 mb-1">
                    <p className="text-sm font-semibold text-brand-darkBlue truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-blue-900 truncate">{user?.email}</p>
                  </div>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <SettingsIcon size={16} /> Security
                  </Link>
                  <div className="border-t border-blue-200 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-white transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden ml-1 p-2 bg-blue-50 border border-blue-200 rounded-lg text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-0 bg-white border-b border-blue-200 shadow-lg p-4 z-40 animate-in fade-in slide-in-from-top-2">
          
          <div className="mb-4 pb-4 border-b border-blue-200 sm:hidden">
             <span className="text-[10px] text-brand-blue font-semibold uppercase tracking-wider mb-2 block">Risk Profile</span>
             <select 
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                className="w-full bg-blue-50 border border-blue-200 text-brand-darkBlue text-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
              >
                <option value="zomato" className="bg-white">🍒 Food Delivery</option>
                <option value="swiggy" className="bg-white">🥡 Groceries</option>
                <option value="zepto" className="bg-white">🛒 E-Commerce</option>
              </select>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-3 rounded-lg text-base font-medium text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white transition-colors border border-transparent hover:border-brand-darkBlue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
