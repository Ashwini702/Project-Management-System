// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardPathByRole } from '../utils/authUtils';

/**
 * PublicRoute Component
 * Prevents logged-in users from accessing auth pages (login, register, forgot password).
 * If user is already logged in, redirects to their role-based dashboard.
 */
const PublicRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading-container">
        <div className="route-loading-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Checking access...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, redirect to their dashboard
  if (isLoggedIn && user) {
    const dashboardPath = getDashboardPathByRole(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  // Not logged in - allow access to public pages
  return children;
};

export default PublicRoute;