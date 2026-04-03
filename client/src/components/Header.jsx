// import React, { useState, useRef, useEffect } from 'react';
// import { Shield, ChevronDown, User, Settings as SettingsIcon, LogOut, Menu, X, BarChart3, ShieldAlert } from 'lucide-react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const navLinks = [
//   { name: 'Dashboard', path: '/dashboard' },
//   { name: 'My Policies', path: '/policy' },
//   { name: 'Claims', path: '/claims' },
//   { name: 'Analytics', path: '/analytics' },
// ];

// const Header = () => {
//   const [isProfileOpen, setIsProfileOpen]     = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate  = useNavigate();
//   const { user, logout } = useAuth();
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

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
//             <img src="/logo.png" alt="SkySafe" className="w-9 h-9 object-contain rounded-xl" />
//             <span className="text-lg font-bold tracking-tight text-slate-800 hidden sm:block">
//               Sky<span className="text-blue-600">Safe</span>
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                     isActive
//                       ? 'bg-blue-50 text-blue-600'
//                       : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Right */}
//           <div className="flex items-center gap-2">
//             {/* User Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
//               >
//                 <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
//                   {user?.initials || 'U'}
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
//                   {user?.name?.split(' ')[0] || 'Account'}
//                 </span>
//                 <ChevronDown
//                   size={14}
//                   className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
//                 />
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 py-2 z-50">
//                   <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
//                     <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'User'}</p>
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
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
//                     isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
//                   }`
//                 }
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//             <div className="border-t border-slate-100 mt-2 pt-2">
//               <button
//                 onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
//                 className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
//               >
//                 Logout
//               </button>
//             </div>
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
            <img src="/logo.png" alt="SkySafe" className="w-12 h-12 object-contain" />
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
