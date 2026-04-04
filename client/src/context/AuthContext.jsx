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
        setUser(buildUser(data.user));
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

  // ✅ ONLY ONE verifyOtp (fixed)
  const verifyOtp = async (email, otp) => {
    const data = await authAPI.verifyOtp({ email, otp });
    return data;
  };

  // ✅ resend OTP (optional but useful)
  const resendOtp = async (email) => {
    const data = await authAPI.resendOtp({ email });
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
      value={{
        user,
        loading,
        login,
        register,
        logout,
        verifyOtp,
        resendOtp,
        refreshUser,
        updateProfile,
        changePassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
