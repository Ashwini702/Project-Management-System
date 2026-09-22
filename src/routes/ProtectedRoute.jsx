// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasRole } from '../utils/authUtils';

/**
 * ProtectedRoute Component
 * Protects dashboard routes based on login status and role permissions.
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components to render
 * @param {string[]} props.allowedRoles - Array of roles allowed to access this route
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
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

  // Not logged in - redirect to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Logged in but role not allowed - redirect to access denied
  if (allowedRoles.length > 0 && !hasRole(user, allowedRoles)) {
    return (
      <Navigate
        to="/403"
        state={{
          requestedPath: location.pathname,
          requiredRole: allowedRoles.join(', '),
          userRole: user.role
        }}
        replace
      />
    );
  }

  // Authorized - render children
  return children;
};

export default ProtectedRoute;