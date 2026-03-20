import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('skysafe_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: "usr_12345",
      name: "Alex Mercer",
      email: email || "alex.mercer@example.com",
      phone: "+1 (555) 123-4567",
      initials: "AM",
      role: "worker"
    };
    setUser(mockUser);
    localStorage.setItem('skysafe_user', JSON.stringify(mockUser));
    return true; // Simulate success
  };

  const loginWithGoogle = () => {
    // Mock Google SSO
    const mockUser = {
      id: "usr_google_789",
      name: "Alex Mercer (Google)",
      email: "alex.mercer@gmail.com",
      phone: "+1 (555) 987-6543",
      initials: "AM",
      role: "worker"
    };
    setUser(mockUser);
    localStorage.setItem('skysafe_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skysafe_user');
  };

  const updateProfile = (data) => {
    if (!user) return false;
    
    // Update initials based on new name
    let initials = user.initials;
    if (data.name) {
      const match = data.name.match(/\b(\w)/g);
      initials = match ? match.slice(0, 2).join('').toUpperCase() : "U";
    }

    const updatedUser = { ...user, ...data, initials };
    setUser(updatedUser);
    localStorage.setItem('skysafe_user', JSON.stringify(updatedUser));
    return true;
  };

  const updatePassword = (newPassword) => {
    // In a real app we'd call an API. Here we just mock success.
    console.log("Password updated successfully.");
    return true;
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
