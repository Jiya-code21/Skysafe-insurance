// import React, { useState, useEffect } from 'react';
// import { 
//   User, Bell, Shield as ShieldIcon, ChevronRight, CheckCircle2, 
//   ShieldAlert, FileText, BadgeCheck, X, Check, Lock, Edit2, LayoutTemplate
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';

// const Toast = ({ message, type = 'success', onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 50 }}
//       className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-glass border ${
//         type === 'success' ? 'bg-blue-100/10 border-brand-blue/20 text-blue-800' : 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
//       }`}
//     >
//       <CheckCircle2 size={18} />
//       <span className="text-sm font-medium text-white">{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={14} /></button>
//     </motion.div>
//   );
// };

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [toast, setToast] = useState(null);
//   const { user } = useAuth(); // Assume user is always loaded here due to ProtectedRoute

//   const tabs = [
//     { id: 'general', label: 'General', icon: User },
//     { id: 'appearance', label: 'Appearance', icon: LayoutTemplate },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'privacy', label: 'Privacy & Security', icon: ShieldIcon },
//   ];

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'general':
//         return <AccountDetailsCard user={user} showToast={showToast} />;
//       case 'appearance':
//         return <AppearanceSettings showToast={showToast} />;
//       case 'notifications':
//         return <NotificationsSettings showToast={showToast} />;
//       case 'privacy':
//         return <PrivacySettings user={user} showToast={showToast} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-display font-bold text-white">Settings & Account</h1>
//         <p className="text-blue-900">Manage your profile, preferences, and security.</p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
        
//         {/* Sidebar Tabs */}
//         <aside className="w-full md:w-64 shrink-0">
//           <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
//                     isActive 
//                       ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20 shadow-sm' 
//                       : 'text-blue-900 hover:bg-white/5 border border-transparent hover:border-white/10'
//                   }`}
//                 >
//                   <Icon size={18} className={isActive ? 'text-brand-blue' : 'text-blue-900'} />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* Selected Tab Content */}
//         <main className="flex-1 min-w-0">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               {renderTabContent()}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>

//       <AnimatePresence>
//         {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// };

// /* --- Sub-Components --- */

// const AccountDetailsCard = ({ user, showToast }) => {
//   const { updateProfile } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ name: user.name, email: user.email, phone: user.phone });

//   const handleSave = () => {
//     updateProfile(formData);
//     setIsEditing(false);
//     showToast("Profile updated successfully!");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="glass-card p-6 md:p-8">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-2">
//           <div className="flex items-center gap-5 w-full">
//             <div className="w-20 h-20 rounded-full border-2 border-brand-blue p-1 shadow-sm overflow-hidden flex-shrink-0 relative group">
//               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                 {user.initials}
//               </div>
//             </div>
            
//             <div className="flex-1 min-w-0">
//               {isEditing ? (
//                 <div className="space-y-3">
//                   <input 
//                     type="text" 
//                     value={formData.name} 
//                     onChange={e => setFormData({...formData, name: e.target.value})}
//                     className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-lg font-bold focus:outline-none focus:border-brand-blue"
//                   />
//                   <input 
//                     type="email" 
//                     value={formData.email} 
//                     onChange={e => setFormData({...formData, email: e.target.value})}
//                     className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-blue-900 text-sm focus:outline-none focus:border-brand-blue"
//                   />
//                   <input 
//                     type="tel" 
//                     value={formData.phone} 
//                     onChange={e => setFormData({...formData, phone: e.target.value})}
//                     className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-blue-900 text-sm focus:outline-none focus:border-brand-blue"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-center gap-2 mb-1">
//                     <h2 className="text-2xl font-bold text-blue-900 truncate">{user.name}</h2>
//                     <BadgeCheck size={20} className="text-brand-blue shrink-0" />
//                   </div>
//                   <p className="text-blue-900 text-sm mb-1 truncate">{user.email}</p>
//                   <p className="text-blue-900 text-sm">{user.phone}</p>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-2 shrink-0">
//             {isEditing ? (
//               <>
//                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
//                 <button onClick={handleSave} className="btn-primary !py-2 !px-4 !rounded-xl !text-sm">Save</button>
//               </>
//             ) : (
//               <button onClick={() => setIsEditing(true)} className="btn-glass flex items-center gap-2 text-sm"><Edit2 size={14}/> Edit Profile</button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* KYC Status */}
//         <div className="glass-card p-6 relative overflow-hidden group">
//            <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all"></div>
//            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//              <ShieldIcon size={20} className="text-brand-blue" />
//              Identity Verification
//            </h3>
//            <div className="space-y-4">
//              <div className="flex items-center justify-between group-hover:px-1 transition-all">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-blue-100/20 text-blue-800 flex items-center justify-center border border-brand-blue/30 shrink-0">
//                     <CheckCircle2 size={16} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-white">Government ID</p>
//                     <p className="text-xs text-blue-900">Verified on Oct 12, 2025</p>
//                   </div>
//                 </div>
//                 <span className="text-xs font-bold text-blue-800 bg-blue-100/10 px-2 py-1 rounded-md uppercase tracking-wide">Approved</span>
//              </div>
             
//              <div className="pt-2">
//                 <div className="flex justify-between text-xs mb-1.5">
//                   <span className="text-blue-900 font-medium">Profile Completeness</span>
//                   <span className="text-brand-blue font-bold">100%</span>
//                 </div>
//                 <div className="w-full h-2 bg-white rounded-full overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-brand-blue to-brand-blue shadow-sm"></motion.div>
//                 </div>
//              </div>
//            </div>
//         </div>

//         {/* Policy Wallet Summary */}
//         <div className="glass-card p-6">
//            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//              <FileText size={20} className="text-brand-blue" />
//              Policy Wallet
//            </h3>
//            <div className="space-y-3">
//              <div className="bg-black/20 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
//                 <div className="flex items-center gap-3 truncate">
//                   <div className="w-10 h-10 rounded-lg bg-blue-100/10 flex items-center justify-center border border-brand-blue/20 text-blue-800 shrink-0">
//                     <ShieldAlert size={20} />
//                   </div>
//                   <div className="truncate">
//                     <p className="text-sm font-medium text-white truncate">Gig Worker Income Protection</p>
//                     <p className="text-xs text-blue-900 truncate">Cov: $500/week • Zomato</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 shrink-0">
//                   <span className="w-2 h-2 rounded-full bg-blue-100 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
//                   <span className="text-xs font-semibold text-blue-800 hidden sm:block">Active</span>
//                 </div>
//              </div>
//            </div>
           
//            <button className="w-full mt-4 text-sm font-medium text-brand-blue hover:text-sky-400 transition-colors py-2 border border-brand-blue/20 rounded-xl hover:bg-brand-blue/10">
//               View All Policies
//            </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SettingsToggle = ({ label, description, isChecked, onChange }) => (
//   <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0 group cursor-pointer" onClick={onChange}>
//     <div className="pr-4">
//       <p className="text-sm font-medium text-white mb-0.5 pointer-events-none">{label}</p>
//       <p className="text-xs text-blue-900 pointer-events-none">{description}</p>
//     </div>
//     <div className={`w-11 h-6 rounded-full p-1 border transition-colors flex shrink-0 ${isChecked ? 'bg-brand-blue border-brand-blue justify-end shadow-sm' : 'bg-white border-blue-200 justify-start'}`}>
//        <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm"></motion.div>
//     </div>
//   </div>
// );

// const AppearanceSettings = ({ showToast }) => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="glass-card p-6 md:p-8">
//       <h3 className="text-xl font-bold mb-6 text-white">Appearance Settings</h3>
//       <div className="space-y-2">
//         <SettingsToggle 
//           label="Dark Mode" 
//           description="Switch between light and dark themes. Will override OS default." 
//           isChecked={theme === 'dark'} 
//           onChange={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')} 
//         />
//       </div>
//     </div>
//   );
// };

// const NotificationsSettings = ({ showToast }) => {
//   const [pref, setPref] = useState({ push: true, email: false, sms: true });
//   return (
//     <div className="glass-card p-6 md:p-8">
//       <h3 className="text-xl font-bold mb-6 text-blue-900">Notification Preferences</h3>
//       <div className="space-y-2">
//         <SettingsToggle label="Push Notifications" description="Receive instant alerts for severe weather and claim updates directly on your device." isChecked={pref.push} onChange={() => setPref({...pref, push: !pref.push})} />
//         <SettingsToggle label="Email Summaries" description="Weekly reports of your coverage status and potential disruptive events." isChecked={pref.email} onChange={() => setPref({...pref, email: !pref.email})} />
//         <SettingsToggle label="SMS Alerts" description="Critical alerts via SMS for immediate attention during disruptions." isChecked={pref.sms} onChange={() => setPref({...pref, sms: !pref.sms})} />
//       </div>
//       <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
//         <button className="btn-primary !py-2 !px-6 text-sm" onClick={() => showToast("Notification preferences saved.")}>Save Preferences</button>
//       </div>
//     </div>
//   );
// };

// const PrivacySettings = ({ user, showToast }) => {
//   const { updatePassword } = useAuth();
//   const [passForm, setPassForm] = useState(false);
//   const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (passwords.new !== passwords.confirm) {
//         showToast("New passwords do not match.", "error"); // Assuming error handled gracefully
//         return;
//     }
//     updatePassword(passwords.new);
//     showToast("Password updated successfully!");
//     setPassForm(false);
//     setPasswords({ current: '', new: '', confirm: '' });
//   };

//   return (
//     <div className="glass-card p-6 md:p-8">
//       <h3 className="text-xl font-bold mb-6 text-blue-900">Privacy & Security</h3>
      
//       <div className="space-y-4 mb-8">
//         <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">Security Settings</h4>
        
//         {passForm ? (
//           <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm relative">
//             <h4 className="text-md font-bold text-blue-900 mb-4 flex items-center gap-2"><Lock size={16}/> Update Password</h4>
//              <form onSubmit={handlePasswordSubmit} className="space-y-4">
//                 <input type="password" required placeholder="Current Password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-900 focus:outline-none focus:border-brand-blue" />
//                 <input type="password" required placeholder="New Password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-900 focus:outline-none focus:border-brand-blue" />
//                 <input type="password" required placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-900 focus:outline-none focus:border-brand-blue" />
//                 <div className="flex gap-2 justify-end mt-4">
//                     <button type="button" onClick={() => setPassForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium bg-white hover:bg-blue-50 text-blue-900 border border-blue-200">Cancel</button>
//                     <button type="submit" className="btn-primary !py-2 !px-4 !rounded-xl !text-sm border-none shadow-sm">Update</button>
//                 </div>
//              </form>
//           </div>
//         ) : (
//           <div className="bg-white border border-blue-200 rounded-xl p-4 flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer group" onClick={() => setPassForm(!passForm)}>
//             <div>
//               <p className="text-sm font-medium text-blue-900 mb-1">Password</p>
//               <p className="text-xs text-blue-900">Last updated recently.</p>
//             </div>
//             <button className="btn-glass py-1.5 px-3 text-xs">Update</button>
//           </div>
//         )}
//       </div>
      
//       <div className="space-y-4">
//         <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">Data & Privacy</h4>
//         <SettingsToggle label="Location Data Sharing" description="Allow SkySafe to use your precise location for faster claims." isChecked={true} onChange={() => {}} />
//       </div>
      
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from 'react';
import {
  User, Bell, Shield as ShieldIcon, CheckCircle2,
  ShieldAlert, FileText, BadgeCheck, X, Lock, Edit2, LayoutTemplate, AlertCircle, Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api.js';

/* ── Toast ───────────────────────────────────────────────────────────── */
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-red-50 border-red-200 text-red-700'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </motion.div>
  );
};

/* ── Toggle ──────────────────────────────────────────────────────────── */
const SettingsToggle = ({ label, description, isChecked, onChange }) => (
  <div
    className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 cursor-pointer group"
    onClick={onChange}
  >
    <div className="pr-4">
      <p className="text-sm font-semibold text-slate-800 mb-0.5">{label}</p>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
    <div
      className={`w-11 h-6 rounded-full px-1 border flex items-center transition-all duration-200 shrink-0 ${
        isChecked ? 'bg-blue-600 border-blue-600 justify-end' : 'bg-slate-100 border-slate-200 justify-start'
      }`}
    >
      <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </div>
  </div>
);

/* ── Main Settings ───────────────────────────────────────────────────── */
const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast]         = useState(null);
  const { user } = useAuth();

  const tabs = [
    { id: 'general',      label: 'General',          icon: User },
    { id: 'notifications',label: 'Notifications',    icon: Bell },
    { id: 'privacy',      label: 'Privacy & Security', icon: ShieldIcon },
  ];

  const showToast = (message, type = 'success') => setToast({ message, type });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings & Account</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your profile, preferences, and security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-52 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'general'       && <AccountDetailsCard user={user} showToast={showToast} />}
              {activeTab === 'notifications' && <NotificationsSettings showToast={showToast} />}
              {activeTab === 'privacy'       && <PrivacySettings showToast={showToast} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

/* ── Account Details ─────────────────────────────────────────────────── */
const AccountDetailsCard = ({ user, showToast }) => {
  const { updateProfile, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [formData, setFormData]   = useState({ name: user?.name || '', email: user?.email || '' });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      showToast('Profile updated successfully!');
    } catch (err) {
      showToast(err.message || 'Update failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-blue-200 shrink-0">
              {user?.initials || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="Email"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-xl font-bold text-slate-800 truncate">{user?.name}</h2>
                    <BadgeCheck size={18} className="text-blue-500 shrink-0" />
                  </div>
                  <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                  {user?.location && (
                    <p className="text-xs text-slate-400 mt-0.5">{user.location}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Edit2 size={14} /> Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KYC & Policy Wallet */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldIcon size={16} className="text-blue-500" /> Identity Verification
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Government ID</p>
                <p className="text-xs text-slate-400">Verified</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              Approved
            </span>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Profile Completeness</span>
              <span className="text-blue-600 font-bold">100%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-blue-500" /> Policy Wallet
          </h3>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-slate-700 truncate">Income Protection</p>
              <p className="text-xs text-slate-400">Weekly plan</p>
            </div>
            <span className="ml-auto text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full shrink-0">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Notifications ───────────────────────────────────────────────────── */
const NotificationsSettings = ({ showToast }) => {
  const [pref, setPref] = useState({ push: true, email: false, sms: true });
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-5">Notification Preferences</h3>
      <SettingsToggle
        label="Push Notifications"
        description="Instant alerts for severe weather and claim updates."
        isChecked={pref.push}
        onChange={() => setPref({ ...pref, push: !pref.push })}
      />
      <SettingsToggle
        label="Email Summaries"
        description="Weekly reports of your coverage status."
        isChecked={pref.email}
        onChange={() => setPref({ ...pref, email: !pref.email })}
      />
      <SettingsToggle
        label="SMS Alerts"
        description="Critical alerts via SMS during disruptions."
        isChecked={pref.sms}
        onChange={() => setPref({ ...pref, sms: !pref.sms })}
      />
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => showToast('Preferences saved!')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

/* ── Privacy & Security ──────────────────────────────────────────────── */
const PrivacySettings = ({ showToast }) => {
  const { changePassword } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirm: '' });
  const [loading, setLoading]     = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (passwords.newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    setLoading(true);
    try {
      await changePassword({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword });
      showToast('Password updated successfully!');
      setShowForm(false);
      setPasswords({ oldPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      showToast(err.message || 'Password update failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
      <h3 className="text-lg font-bold text-slate-800">Privacy & Security</h3>

      {/* Password Section */}
      {showForm ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Lock size={14} /> Update Password
          </h4>
          {['oldPassword', 'newPassword', 'confirm'].map((field) => (
            <input
              key={field}
              type="password"
              required
              placeholder={field === 'oldPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
              value={passwords[field]}
              onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Update
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <p className="text-sm font-semibold text-slate-700">Password</p>
            <p className="text-xs text-slate-400 mt-0.5">Last updated recently</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="border border-slate-200 text-slate-600 hover:bg-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Update
          </button>
        </div>
      )}

      {/* Privacy Toggles */}
      <div className="border-t border-slate-100 pt-4">
        <SettingsToggle
          label="Location Data Sharing"
          description="Allow SkySafe to use your location for faster claims."
          isChecked={true}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default Settings;
