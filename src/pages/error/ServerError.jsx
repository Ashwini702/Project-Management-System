// src/pages/error/ServerError.jsx
import React, { useState } from 'react';
import ServerErrorIllustration from '../../components/error/ServerErrorIllustration';
import ErrorStatusCard from '../../components/error/ErrorStatusCard';
import TroubleshootingCard from '../../components/error/TroubleshootingCard';
import {
  FiLayers,
  FiArrowLeft,
  FiHome,
  FiRefreshCw,
  FiServer,
  FiCloud,
  FiDatabase,
  FiFileText,
  FiActivity,
  FiHeadphones,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiSend,
  FiMail,
  FiUser,
  FiEdit3
} from 'react-icons/fi';
import '../../styles/serverError.css';

const ServerError = () => {
  const [issueForm, setIssueForm] = useState({
    name: '',
    email: '',
    title: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDashboardClick = () => {
    showAlert('Dashboard navigation is frontend demo only.', 'info');
  };

  const handleStatusCardClick = (destination) => {
    showAlert(`${destination} status is frontend demo only.`, 'info');
  };

  const handleTroubleCardClick = (destination) => {
    showAlert(`${destination} is frontend demo only.`, 'info');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setIssueForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateIssueForm = () => {
    const errors = {};
    if (!issueForm.name.trim()) errors.name = 'Name is required';
    if (!issueForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(issueForm.email)) errors.email = 'Valid email is required';
    if (!issueForm.title.trim()) errors.title = 'Issue title is required';
    if (!issueForm.description.trim()) errors.description = 'Description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!validateIssueForm()) return;
    showAlert('Issue report submitted successfully! This is frontend demo only.', 'success');
    setIssueForm({ name: '', email: '', title: '', description: '' });
  };

  // If React Router is configured, use:
  // const navigate = useNavigate();
  // const handleGoBack = () => navigate(-1);
  // const handleGoHome = () => navigate('/');

  const statusCards = [
    { id: 1, icon: FiServer, title: 'Server Status', status: 'Temporary Error', description: 'Experiencing intermittent issues' },
    { id: 2, icon: FiCloud, title: 'API Status', status: 'Unavailable', description: 'API endpoints not responding' },
    { id: 3, icon: FiDatabase, title: 'Database Status', status: 'Checking', description: 'Reconnecting to database' },
    { id: 4, icon: FiFileText, title: 'Request Status', status: 'Failed', description: 'Request could not complete' },
    { id: 5, icon: FiActivity, title: 'Error Code', status: 'Temporary Error', description: 'Internal Server Error - 500' },
    { id: 6, icon: FiHeadphones, title: 'Support Status', status: 'Available', description: 'Support team is online' }
  ];

  const troubleshootingCards = [
    { id: 1, icon: FiRefreshCw, title: 'Refresh the Page', description: 'Reload the page to try again' },
    { id: 2, icon: FiHome, title: 'Return to Dashboard', description: 'Go back to your dashboard' },
    { id: 3, icon: FiArrowLeft, title: 'Try Again Later', description: 'Wait and try after some time' },
    { id: 4, icon: FiHeadphones, title: 'Contact Support', description: 'Reach out to our support team' },
    { id: 5, icon: FiEdit3, title: 'Report This Issue', description: 'Submit a detailed error report' }
  ];

  return (
    <div className="server-error-wrapper">
      {/* Header Branding */}
      <header className="se-header">
        <div className="se-header-branding">
          <FiLayers className="se-branding-icon" />
          <span className="se-branding-text">Project Management System</span>
        </div>
        <div className="se-header-actions">
          <button className="se-header-btn" onClick={handleDashboardClick}>
            <FiHome className="me-1" /> Dashboard
          </button>
          <button className="se-header-btn se-header-btn-outline" onClick={handleDashboardClick}>
            <FiArrowLeft className="me-1" /> Back to Login
          </button>
        </div>
      </header>

      {/* Alert Area */}
      {alert && (
        <div className="se-alert-container">
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.type === 'warning' && <FiAlertCircle className="me-2" />}
            {alert.type === 'info' && <FiInfo className="me-2" />}
            {alert.type === 'success' && <FiInfo className="me-2" />}
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="se-main">
        <div className="se-layout">
          {/* Left: Error Content */}
          <div className="se-content">
            <div className="se-content-card">
              <div className="se-label">500 Error</div>
              <h1 className="se-title">Internal Server Error</h1>
              <p className="se-message">
                The server encountered an unexpected condition and could not complete your request.
              </p>
              <p className="se-help-text">
                Please refresh the page, try again after some time, or contact support if the problem continues.
              </p>

              {/* Action Buttons */}
              <div className="se-actions">
                <button className="btn btn-primary se-action-btn" onClick={handleRefresh}>
                  <FiRefreshCw className="me-2" /> Refresh Page
                </button>
                <button className="btn btn-outline-primary se-action-btn" onClick={handleDashboardClick}>
                  <FiHome className="me-2" /> Go to Dashboard
                </button>
                <button className="btn btn-outline-secondary se-action-btn" onClick={handleDashboardClick}>
                  <FiArrowLeft className="me-2" /> Back to Login
                </button>
                <button className="btn btn-light se-action-btn" onClick={handleGoBack}>
                  <FiArrowLeft className="me-2" /> Go Back
                </button>
              </div>

              {/* Error Details Box */}
              <div className="se-error-box">
                <h6 className="se-error-box-title">
                  <FiAlertCircle className="me-2" /> Error Details
                </h6>
                <div className="se-error-grid">
                  <div className="se-error-item">
                    <span className="se-error-label">Error Code</span>
                    <span className="se-error-value text-danger">500</span>
                  </div>
                  <div className="se-error-item">
                    <span className="se-error-label">Error Type</span>
                    <span className="se-error-value">Internal Server Error</span>
                  </div>
                  <div className="se-error-item">
                    <span className="se-error-label">Request ID</span>
                    <span className="se-error-value">PMS-500-2026</span>
                  </div>
                  <div className="se-error-item">
                    <span className="se-error-label">Time</span>
                    <span className="se-error-value">{new Date().toISOString().replace('T', ' ').substring(0, 19)}</span>
                  </div>
                  <div className="se-error-item">
                    <span className="se-error-label">Module</span>
                    <span className="se-error-value">Project Management System</span>
                  </div>
                  <div className="se-error-item">
                    <span className="se-error-label">Status</span>
                    <span className="se-error-value text-danger">Failed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="se-illustration-section">
            <ServerErrorIllustration />
          </div>
        </div>

        {/* System Status Section */}
        <div className="se-status-section">
          <h3 className="se-section-title">System Status</h3>
          <p className="se-section-subtitle">Current status of system components</p>
          <div className="se-status-grid">
            {statusCards.map((card) => (
              <ErrorStatusCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                status={card.status}
                description={card.description}
                onClick={() => handleStatusCardClick(card.title)}
              />
            ))}
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="se-trouble-section">
          <h3 className="se-section-title">Troubleshooting</h3>
          <p className="se-section-subtitle">Try these steps to resolve the issue</p>
          <div className="se-trouble-grid">
            {troubleshootingCards.map((card) => (
              <TroubleshootingCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                onClick={() => handleTroubleCardClick(card.title)}
              />
            ))}
          </div>
        </div>

        {/* Report Issue Form */}
        <div className="se-report-section">
          <div className="se-report-card">
            <h6 className="se-report-title">
              <FiEdit3 className="me-2" /> Report This Issue
            </h6>
            <p className="se-report-desc">
              Help us fix the problem by providing details about the error.
            </p>
            <form onSubmit={handleIssueSubmit} noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Your Name *</label>
                  <div className="se-input-wrapper">
                    <FiUser className="se-input-icon" />
                    <input
                      type="text"
                      name="name"
                      className={`form-control se-input ${formErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your name"
                      value={issueForm.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.name && <div className="invalid-feedback d-block">{formErrors.name}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Your Email *</label>
                  <div className="se-input-wrapper">
                    <FiMail className="se-input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-control se-input ${formErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                      value={issueForm.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.email && <div className="invalid-feedback d-block">{formErrors.email}</div>}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Issue Title *</label>
                  <div className="se-input-wrapper">
                    <FiAlertCircle className="se-input-icon" />
                    <input
                      type="text"
                      name="title"
                      className={`form-control se-input ${formErrors.title ? 'is-invalid' : ''}`}
                      placeholder="Brief description of the issue"
                      value={issueForm.title}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.title && <div className="invalid-feedback d-block">{formErrors.title}</div>}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Issue Description *</label>
                  <textarea
                    name="description"
                    className={`form-control se-textarea ${formErrors.description ? 'is-invalid' : ''}`}
                    rows="3"
                    placeholder="Describe what happened before the error occurred..."
                    value={issueForm.description}
                    onChange={handleFormChange}
                  ></textarea>
                  {formErrors.description && <div className="invalid-feedback d-block">{formErrors.description}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary se-submit-btn">
                <FiSend className="me-2" /> Submit Issue Report
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="se-footer">
        <p>© 2026 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServerError;