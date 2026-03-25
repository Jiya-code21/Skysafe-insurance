import React, { useEffect, useState } from "react";
import {
  User,
  Bell,
  Shield as ShieldIcon,
  CheckCircle2,
  ShieldAlert,
  FileText,
  BadgeCheck,
  X,
  Lock,
  Edit2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
        type === "success"
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
    >
      {type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </motion.div>
  );
};

const SettingsToggle = ({ label, description, isChecked, onChange }) => (
  <div
    className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 cursor-pointer"
    onClick={onChange}
  >
    <div className="pr-4">
      <p className="text-sm font-semibold text-slate-800 mb-0.5">{label}</p>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
    <div
      className={`w-11 h-6 rounded-full px-1 border flex items-center transition-all duration-200 shrink-0 ${
        isChecked
          ? "bg-blue-600 border-blue-600 justify-end"
          : "bg-slate-100 border-slate-200 justify-start"
      }`}
    >
      <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </div>
  </div>
);

const AccountDetailsCard = ({ user, showToast }) => {
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      location: user?.location || "",
    });
  }, [user]);

  const handleSave = async () => {
    setSaving(true);

    try {
      await updateProfile(formData);
      setIsEditing(false);
      showToast("Profile updated successfully.");
    } catch (err) {
      showToast(err.message || "Profile update failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-blue-200 shrink-0">
              {user?.initials || "U"}
            </div>

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((current) => ({ ...current, name: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((current) => ({ ...current, email: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((current) => ({ ...current, location: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="City"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-xl font-bold text-slate-800 truncate">{user?.name}</h2>
                    <BadgeCheck size={18} className="text-blue-500 shrink-0" />
                  </div>
                  <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{user?.location || "No city added"}</p>
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
                  {saving && <Loader2 size={14} className="animate-spin" />}
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
                animate={{ width: "100%" }}
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

const NotificationsSettings = ({ showToast }) => {
  const [preferences, setPreferences] = useState({
    push: true,
    email: false,
    sms: true,
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-5">Notification Preferences</h3>
      <SettingsToggle
        label="Push Notifications"
        description="Instant alerts for severe weather and claim updates."
        isChecked={preferences.push}
        onChange={() =>
          setPreferences((current) => ({ ...current, push: !current.push }))
        }
      />
      <SettingsToggle
        label="Email Summaries"
        description="Weekly reports of your coverage status."
        isChecked={preferences.email}
        onChange={() =>
          setPreferences((current) => ({ ...current, email: !current.email }))
        }
      />
      <SettingsToggle
        label="SMS Alerts"
        description="Critical alerts via SMS during disruptions."
        isChecked={preferences.sms}
        onChange={() =>
          setPreferences((current) => ({ ...current, sms: !current.sms }))
        }
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => showToast("Preferences saved.")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const PrivacySettings = ({ showToast }) => {
  const { changePassword } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirm) {
      showToast("New passwords do not match.", "error");
      return;
    }

    if (passwords.newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      showToast("Password updated successfully.");
      setShowForm(false);
      setPasswords({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      showToast(err.message || "Password update failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
      <h3 className="text-lg font-bold text-slate-800">Privacy & Security</h3>

      {showForm ? (
        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200"
        >
          <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Lock size={14} /> Update Password
          </h4>

          {["oldPassword", "newPassword", "confirm"].map((field) => (
            <input
              key={field}
              type="password"
              required
              placeholder={
                field === "oldPassword"
                  ? "Current Password"
                  : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"
              }
              value={passwords[field]}
              onChange={(e) =>
                setPasswords((current) => ({ ...current, [field]: e.target.value }))
              }
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
            <p className="text-xs text-slate-400 mt-0.5">Keep your account secure</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="border border-slate-200 text-slate-600 hover:bg-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Update
          </button>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4">
        <SettingsToggle
          label="Location Data Sharing"
          description="Allow SkySafe to use your location for faster weather-based claims."
          isChecked
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState(null);

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: ShieldIcon },
  ];

  const showToast = (message, type = "success") => setToast({ message, type });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings & Account</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your profile, preferences, and security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
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
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "text-slate-600 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "general" && (
                <AccountDetailsCard user={user} showToast={showToast} />
              )}
              {activeTab === "notifications" && (
                <NotificationsSettings showToast={showToast} />
              )}
              {activeTab === "privacy" && (
                <PrivacySettings showToast={showToast} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
