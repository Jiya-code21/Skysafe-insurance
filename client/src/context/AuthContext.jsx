// import React, { createContext, useContext, useState, useEffect } from "react";
// import { authAPI } from "../api/api.js";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On mount: fetch current user if token exists
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     authAPI
//       .getMe()
//       .then((data) => {
//         const u = data.user;
//         setUser({
//           ...u,
//           initials: u.name
//             ? u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
//             : "U",
//         });
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const login = async (email, password) => {
//     const data = await authAPI.login({ email, password });
//     localStorage.setItem("token", data.token);
//     // Fetch full user profile
//     const me = await authAPI.getMe();
//     const u = me.user;
//     setUser({
//       ...u,
//       initials: u.name
//         ? u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
//         : "U",
//     });
//     return data;
//   };

//   const register = async (name, email, password, location) => {
//     const data = await authAPI.register({ name, email, password, location });
//     return data;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const refreshUser = async () => {
//     const me = await authAPI.getMe();
//     const u = me.user;
//     setUser({
//       ...u,
//       initials: u.name
//         ? u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
//         : "U",
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
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

  // On mount: fetch current user if token exists
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

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
    const me = await authAPI.getMe();
    setUser(buildUser(me.user));
  };

  // FIX: updateProfile now calls API and refreshes user
  const updateProfile = async (body) => {
    await authAPI.updateProfile(body);
    await refreshUser();
  };

  // FIX: changePassword / updatePassword both point to same API
  const changePassword = async (body) => {
    await authAPI.changePassword(body);
  };
  const updatePassword = changePassword; // alias used in Settings.jsx

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser, updateProfile, changePassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
