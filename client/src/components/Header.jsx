// // import React, { useState } from 'react';
// // import { Shield, ChevronDown, User, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
// // import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// // import clsx from 'clsx';
// // import { useAuth } from '../context/AuthContext';

// // const navLinks = [
// //   { name: 'Dashboard', path: '/dashboard' },
// //   { name: 'My Policies', path: '/dashboard' }, // We'll map My Policies to Dashboard for now or a new page
// //   { name: 'Claims', path: '/claims' },
// // ];

// // const Header = () => {
// //   const [partner, setPartner] = useState('zomato');
// //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { user, logout } = useAuth();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-blue-200 shadow-sm">
// //       <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
// //         <div className="flex items-center justify-between relative z-10 p-2">
          
// //           {/* Logo Section */}
// //           <div className="flex items-center gap-3">
// //             <Link to="/" className="flex items-center gap-2 group">
// //               <div className="relative w-10 h-10 rounded-lg bg-brand-blue p-0.5 shadow-sm transition-transform group-hover:scale-105">
// //                 <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
// //                   {/* Assuming logo.png is provided, fallback to Shield if missing */}
// //                   <img 
// //                     src="/logo.png" 
// //                     alt="SkySafe Logo" 
// //                     className="w-full h-full object-contain p-1 rounded-md"
// //                     onError={(e) => {
// //                       e.target.style.display = 'none';
// //                       e.target.nextSibling.style.display = 'block';
// //                     }}
// //                   />
// //                   <Shield size={20} className="text-brand-blue hidden" />
// //                 </div>
// //               </div>
// //               <span className="text-xl font-bold tracking-tight text-brand-darkBlue hidden sm:block">
// //                 Sky<span className="text-brand-blue">Safe</span>
// //               </span>
// //             </Link>
// //           </div>

// //           {/* Center Navigation (Desktop) */}
// //           <nav className="hidden md:flex items-center gap-6">
// //             {navLinks.map((link) => {
// //               const isActive = location.pathname.includes(link.path) || 
// //                               (link.path === '/dashboard' && location.pathname === '/');
// //               return (
// //                 <NavLink
// //                   key={link.name}
// //                   to={link.path}
// //                   className={clsx(
// //                     "text-sm font-semibold transition-all duration-300 pb-1 border-b-2",
// //                     isActive 
// //                       ? "text-brand-blue border-brand-blue" 
// //                       : "text-blue-900 border-transparent hover:text-brand-darkBlue hover:border-brand-darkBlue"
// //                   )}
// //                 >
// //                   {link.name}
// //                 </NavLink>
// //               );
// //             })}
// //           </nav>

// //           {/* Right Section: Segment Control & Account */}
// //           <div className="flex items-center gap-3">
            
// //             {/* Segment Control */}
// //             <div className="hidden sm:flex flex-col items-end">
// //               <span className="text-[10px] text-brand-blue font-semibold uppercase tracking-wider mb-0.5 px-1">Risk Profile</span>
// //               <div className="relative group">
// //                 <select 
// //                   value={partner}
// //                   onChange={(e) => setPartner(e.target.value)}
// //                   className="bg-blue-50 border border-blue-200 hover:border-brand-darkBlue text-brand-darkBlue text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 appearance-none focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all cursor-pointer shadow-sm"
// //                 >
// //                   <option value="zomato" className="bg-white">🍒 Food Delivery</option>
// //                   <option value="swiggy" className="bg-white">🥡 Groceries</option>
// //                   <option value="zepto" className="bg-white">🛒 E-Commerce</option>
// //                 </select>
// //                 <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-900 pointer-events-none group-hover:text-brand-darkBlue transition-colors" />
// //               </div>
// //             </div>

// //             {/* Account Avatar Dropdown */}
// //             <div className="relative ml-2">
// //               <button 
// //                 onClick={() => setIsProfileOpen(!isProfileOpen)}
// //                 className="w-10 h-10 rounded-full border border-blue-200 p-0.5 overflow-hidden focus:outline-none shadow-sm hover:border-brand-darkBlue transition-colors bg-white mt-1 group"
// //               >
// //                 <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-brand-blue font-bold text-sm group-hover:bg-brand-darkBlue group-hover:text-white transition-colors">
// //                   {user?.initials || <User size={18} />}
// //                 </div>
// //               </button>

// //               {/* Dropdown Menu */}
// //               {isProfileOpen && (
// //                 <div className="absolute right-0 mt-3 w-48 bg-white border border-blue-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-4">
// //                   <div className="px-4 py-2 border-b border-blue-200 mb-1">
// //                     <p className="text-sm font-semibold text-brand-darkBlue truncate">{user?.name || "User"}</p>
// //                     <p className="text-xs text-blue-900 truncate">{user?.email}</p>
// //                   </div>
// //                   <Link 
// //                     to="/settings" 
// //                     className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:text-brand-blue hover:bg-blue-50 transition-colors"
// //                     onClick={() => setIsProfileOpen(false)}
// //                   >
// //                     <User size={16} /> Profile
// //                   </Link>
// //                   <Link 
// //                     to="/settings" 
// //                     className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:text-brand-blue hover:bg-blue-50 transition-colors"
// //                     onClick={() => setIsProfileOpen(false)}
// //                   >
// //                     <SettingsIcon size={16} /> Security
// //                   </Link>
// //                   <div className="border-t border-blue-200 my-1"></div>
// //                   <button 
// //                     onClick={handleLogout}
// //                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-white transition-colors"
// //                   >
// //                     <LogOut size={16} /> Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Mobile Menu Toggle */}
// //             <button 
// //               className="md:hidden ml-1 p-2 bg-blue-50 border border-blue-200 rounded-lg text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white transition-colors"
// //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             >
// //               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
// //             </button>
// //           </div>
// //         </div>

// //       </div>

// //       {/* Mobile Menu Overlay */}
// //       {isMobileMenuOpen && (
// //         <div className="md:hidden absolute top-full left-0 right-0 mt-0 bg-white border-b border-blue-200 shadow-lg p-4 z-40 animate-in fade-in slide-in-from-top-2">
          
// //           <div className="mb-4 pb-4 border-b border-blue-200 sm:hidden">
// //              <span className="text-[10px] text-brand-blue font-semibold uppercase tracking-wider mb-2 block">Risk Profile</span>
// //              <select 
// //                 value={partner}
// //                 onChange={(e) => setPartner(e.target.value)}
// //                 className="w-full bg-blue-50 border border-blue-200 text-brand-darkBlue text-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
// //               >
// //                 <option value="zomato" className="bg-white">🍒 Food Delivery</option>
// //                 <option value="swiggy" className="bg-white">🥡 Groceries</option>
// //                 <option value="zepto" className="bg-white">🛒 E-Commerce</option>
// //               </select>
// //           </div>

// //           <nav className="flex flex-col gap-2">
// //             {navLinks.map((link) => (
// //               <Link
// //                 key={link.name}
// //                 to={link.path}
// //                 className="px-4 py-3 rounded-lg text-base font-medium text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white transition-colors border border-transparent hover:border-brand-darkBlue"
// //                 onClick={() => setIsMobileMenuOpen(false)}
// //               >
// //                 {link.name}
// //               </Link>
// //             ))}
// //           </nav>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;
// import React, { useState } from 'react';
// import { Shield, ChevronDown, User, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import clsx from 'clsx';
// import { useAuth } from '../context/AuthContext';

// const navLinks = [
//   { name: 'Dashboard', path: '/dashboard' },
//   { name: 'My Policies', path: '/policy' },
//   { name: 'Claims', path: '/claims' },
// ];

// const Header = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
//       <div className="mx-auto max-w-7xl px-4 sm:px-8">
//         <div className="flex items-center justify-between h-16">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2.5 group">
//             <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
//               <Shield size={18} className="text-white" />
//             </div>
//             <span className="text-lg font-bold tracking-tight text-slate-800 hidden sm:block">
//               Sky<span className="text-blue-600">Safe</span>
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
//               return (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   className={clsx(
//                     "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
//                     isActive
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
//                   )}
//                 >
//                   {link.name}
//                 </NavLink>
//               );
//             })}
//           </nav>

//           {/* Right */}
//           <div className="flex items-center gap-2">
//             {/* User menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
//               >
//                 <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
//                   {user?.initials || <User size={14} />}
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
//                   {user?.name?.split(" ")[0] || "Account"}
//                 </span>
//                 <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 py-2 z-50">
//                   <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
//                     <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "User"}</p>
//                     <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
//                   </div>
//                   <Link
//                     to="/settings"
//                     className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
//                     onClick={() => setIsProfileOpen(false)}
//                   >
//                     <User size={15} /> Profile
//                   </Link>
//                   <Link
//                     to="/settings"
//                     className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
//                     onClick={() => setIsProfileOpen(false)}
//                   >
//                     <SettingsIcon size={15} /> Settings
//                   </Link>
//                   <div className="border-t border-slate-100 my-1" />
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
//                   >
//                     <LogOut size={15} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile toggle */}
//             <button
//               className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3">
//           <nav className="flex flex-col gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
import React, { useState, useRef, useEffect } from 'react';
import { Shield, ChevronDown, User, Settings as SettingsIcon, LogOut, Menu, X, BarChart3, ShieldAlert } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Policies', path: '/policy' },
  { name: 'Claims', path: '/claims' },
  { name: 'Analytics', path: '/analytics' },
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen]     = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate  = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800 hidden sm:block">
              Sky<span className="text-blue-600">Safe</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {user?.initials || 'U'}
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
                  {user?.name?.split(' ')[0] || 'Account'}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={15} /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <SettingsIcon size={15} /> Settings
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-slate-100 mt-2 pt-2">
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
