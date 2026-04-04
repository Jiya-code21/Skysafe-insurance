import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle, UserCheck, UserX } from "lucide-react";
import { adminAPI } from "../api/api.js";

const formatDate = (v) => v ? new Date(v).toLocaleDateString("en-IN", {
  day: "2-digit", month: "short", year: "numeric"
}) : "-";

export default function AdminUsers() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [updating, setUpdating] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    adminAPI.getUsers()
      .then((d) => setUsers(d.users || []))
      .catch(() => setError("Could not load users."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggle = async (user) => {
    setUpdating(user._id);
    try {
      user.isActive
        ? await adminAPI.deactivateUser(user._id)
        : await adminAPI.activateUser(user._id);
      fetchUsers();
    } catch {
      setError("Action failed.");
    } finally {
      setUpdating("");
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage platform users.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <p className="text-slate-400">No users found.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Joined: {formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Subscriptions</p>
                  <p className="text-sm font-bold text-slate-700">{user.subCount ?? 0}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                  user.isActive
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-500 border-red-200"
                }`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() => toggle(user)}
                  disabled={updating === user._id}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
                    user.isActive
                      ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                  }`}
                >
                  {updating === user._id
                    ? <Loader2 size={13} className="animate-spin" />
                    : user.isActive
                      ? <><UserX size={13} /> Deactivate</>
                      : <><UserCheck size={13} /> Activate</>
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}