// src/pages/error/NotFound.jsx
import React, { useState } from 'react';
import ErrorIllustration from '../../components/error/ErrorIllustration';
import ErrorActionCard from '../../components/error/ErrorActionCard';
import {
  FiLayers,
  FiArrowLeft,
  FiHome,
  FiSearch,
  FiGrid,
  FiUserCheck,
  FiUsers,
  FiBriefcase,
  FiFolder,
  FiCheckSquare,
  FiHelpCircle,
  FiAlertCircle,
  FiInfo,
  FiX
} from 'react-icons/fi';
import '../../styles/notFound.css';

const NotFound = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      showAlert('Please enter a search keyword.', 'warning');
      return;
    }
    showAlert('Search feature is frontend demo only.', 'info');
    setSearchTerm('');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDashboardClick = () => {
    showAlert('Dashboard navigation is frontend demo only.', 'info');
  };

  const handleQuickLinkClick = (destination) => {
    showAlert(`${destination} is frontend demo only.`, 'info');
  };

  // If React Router is configured, use:
  // const navigate = useNavigate();
  // const handleGoBack = () => navigate(-1);
  // const handleGoHome = () => navigate('/');

  const quickLinks = [
    { id: 1, icon: FiGrid, title: 'Admin Dashboard', description: 'Full system access and control', destination: 'Admin Dashboard' },
    { id: 2, icon: FiUserCheck, title: 'Manager Dashboard', description: 'Project management panel', destination: 'Manager Dashboard' },
    { id: 3, icon: FiUsers, title: 'Team Dashboard', description: 'Team member workspace', destination: 'Team Dashboard' },
    { id: 4, icon: FiBriefcase, title: 'Client Dashboard', description: 'Client project portal', destination: 'Client Dashboard' },
    { id: 5, icon: FiFolder, title: 'Projects', description: 'View all projects', destination: 'Projects' },
    { id: 6, icon: FiCheckSquare, title: 'Tasks', description: 'Manage project tasks', destination: 'Tasks' },
    { id: 7, icon: FiHelpCircle, title: 'Support / Help', description: 'Get help and documentation', destination: 'Support' }
  ];

  return (
    <div className="not-found-wrapper">
      {/* Header Branding */}
      <header className="not-found-header">
        <div className="header-branding">
          <FiLayers className="branding-icon" />
          <span className="branding-text">Project Management System</span>
        </div>
        <button className="header-back-btn" onClick={handleDashboardClick}>
          <FiArrowLeft className="me-1" /> Back to Login
        </button>
      </header>

      {/* Alert Area */}
      {alert && (
        <div className="not-found-alert-container">
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.type === 'warning' && <FiAlertCircle className="me-2" />}
            {alert.type === 'info' && <FiInfo className="me-2" />}
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="not-found-main">
        <div className="not-found-layout">
          {/* Left: Error Content */}
          <div className="not-found-content">
            <div className="error-content-card">
              <div className="error-label">404 Error</div>
              <h1 className="error-title">Oops! Page Not Found</h1>
              <p className="error-message">
                The page you are trying to access may have been removed, renamed, or is currently unavailable.
              </p>
              <p className="error-help-text">
                Please check the URL or use the quick links below to continue.
              </p>

              {/* Action Buttons */}
              <div className="error-actions">
                <button className="btn btn-primary action-btn" onClick={handleDashboardClick}>
                  <FiHome className="me-2" /> Go to Dashboard
                </button>
                <button className="btn btn-outline-primary action-btn" onClick={handleDashboardClick}>
                  <FiArrowLeft className="me-2" /> Back to Login
                </button>
                <button className="btn btn-light action-btn" onClick={handleGoBack}>
                  <FiArrowLeft className="me-2" /> Go Back
                </button>
              </div>

              {/* Search Box */}
              <div className="error-search-box">
                <form onSubmit={handleSearch}>
                  <div className="search-input-wrapper">
                    <FiSearch className="search-input-icon" />
                    <input
                      type="text"
                      className="form-control search-input-field"
                      placeholder="Search project, task, client, or help topic..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary search-submit-btn">
                      <FiSearch className="me-1" /> Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="not-found-illustration">
            <ErrorIllustration />
          </div>
        </div>

        {/* Quick Link Cards */}
        <div className="not-found-quick-links">
          <h3 className="quick-links-title">Quick Links</h3>
          <p className="quick-links-subtitle">Navigate to frequently used sections</p>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <ErrorActionCard
                key={link.id}
                icon={link.icon}
                title={link.title}
                description={link.description}
                onClick={() => handleQuickLinkClick(link.destination)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="not-found-footer">
        <p>© 2026 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFound;