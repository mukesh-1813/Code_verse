import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await authService.login({ email, password });
    // Backend response shape:
    // { success, message, data: { user, tokens: { access, refresh } } }
    const payload = data?.data || data;
    const { user: loggedInUser, tokens } = payload;

    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (payload) => {
    const { data } = await authService.register(payload);
    return data;
  };

  const logout = async () => {
    const refresh = localStorage.getItem("refresh");
    try {
      if (refresh) await authService.logout(refresh);
    } catch (e) {
      // ignore - clear local state regardless
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const refreshProfile = async () => {
    const { data } = await authService.getProfile();
    const profile = data?.data || data;
    localStorage.setItem("user", JSON.stringify(profile));
    setUser(profile);
    return profile;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
