import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const buildUser = (u) => ({
    ...u,
    initials: u.name
      ? u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    authAPI
      .getMe()
      .then((data) => {
        const u = data.user;
        setUser(buildUser(u));
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    localStorage.setItem("token", data.token);
    const me = await authAPI.getMe();
    setUser(buildUser(me.user));
    return data;
  };

  const register = async (name, email, password, location) => {
    const data = await authAPI.register({ name, email, password, location });
    return data;
  };
  const verifyOtp = async (email, code) => {
  // Call your backend API to verify the OTP
  // Example:
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp: code }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Invalid OTP");
  }
};

const resendOtp = async (email) => {
  // Call your backend API to resend the OTP
  const res = await fetch("/api/auth/resend-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Could not resend OTP");
  }
};

  // ✅ Naya
  const verifyOtp = async (email, otp) => {
    const data = await authAPI.verifyOtp({ email, otp });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
    const me = await authAPI.getMe();
    setUser(buildUser(me.user));
  };

  const updateProfile = async (body) => {
    await authAPI.updateProfile(body);
    await refreshUser();
  };

  const changePassword = async (body) => {
    await authAPI.changePassword(body);
  };
  const updatePassword = changePassword;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, verifyOtp, refreshUser, updateProfile, changePassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);