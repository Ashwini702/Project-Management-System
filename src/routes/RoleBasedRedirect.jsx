// src/routes/RoleBasedRedirect.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardPathByRole } from '../utils/authUtils';

/**
 * RoleBasedRedirect Component
 * Redirects user to their role-based dashboard.
 * If not logged in, redirects to login page.
 * 
 * Useful for default routes like "/" or "/dashboard".
 */
const RoleBasedRedirect = () => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading-container">
        <div className="route-loading-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const dashboardPath = getDashboardPathByRole(user.role);
  return <Navigate to={dashboardPath} replace />;
};

export default RoleBasedRedirect;