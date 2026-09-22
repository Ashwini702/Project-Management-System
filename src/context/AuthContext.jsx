// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setAuthUser, getAuthUser, removeAuthUser } from '../utils/authUtils';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getAuthUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await authService.login({ email, password });
      localStorage.setItem('pms_token', data.data.token);
      setUser(data.data);
      setAuthUser(data.data);
      return { success: true, message: data.message, user: data.data, dashboardPath: data.data.dashboardPath };
    } catch (error) {
      const detail = error.response?.data?.message;
      return { success: false, message: detail || 'Unable to connect to the server. Please try again.', user: null };
    }
  }, []);

  const logout = useCallback(async () => {
    if (localStorage.getItem('pms_token')) authService.logout().catch(() => {});
    localStorage.removeItem('pms_token');
    setUser(null);
    removeAuthUser();
  }, []);

  const updateUser = useCallback((updatedUser) => {
    const mergedUser = { ...user, ...updatedUser };
    setUser(mergedUser);
    setAuthUser(mergedUser);
  }, [user]);

  const value = {
    user,
    isLoggedIn: !!user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


