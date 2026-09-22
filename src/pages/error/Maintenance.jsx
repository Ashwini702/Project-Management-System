// src/pages/error/Maintenance.jsx
import React, { useState } from 'react';
import MaintenanceIllustration from '../../components/error/MaintenanceIllustration';
import MaintenanceStatusCard from '../../components/error/MaintenanceStatusCard';
import MaintenanceUpdateCard from '../../components/error/MaintenanceUpdateCard';
import {
  FiLayers,
  FiArrowLeft,
  FiRefreshCw,
  FiHeadphones,
  FiServer,
  FiDatabase,
  FiShield,
  FiMonitor,
  FiCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiSend,
  FiMail,
  FiUser,
  FiUsers,
  FiClock
} from 'react-icons/fi';
import '../../styles/maintenance.css';

const Maintenance = () => {
  const [notifyForm, setNotifyForm] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNotifyForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateNotifyForm = () => {
    const errors = {};
    if (!notifyForm.name.trim()) errors.name = 'Name is required';
    if (!notifyForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyForm.email)) errors.email = 'Valid email is required';
    if (!notifyForm.role) errors.role = 'Please select a role';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!validateNotifyForm()) return;
    showAlert('You will be notified when the system is live again! This is frontend demo only.', 'success');
    setNotifyForm({ name: '', email: '', role: '', message: '' });
  };

  const statusCards = [
    { id: 1, icon: FiServer, title: 'Server Backup', status: 'Completed', description: 'Full system backup completed' },
    { id: 2, icon: FiDatabase, title: 'Database Optimization', status: 'In Progress', description: 'Optimizing query performance' },
    { id: 3, icon: FiShield, title: 'Security Updates', status: 'Pending', description: 'Applying security patches' },
    { id: 4, icon: FiMonitor, title: 'Dashboard Upgrade', status: 'Pending', description: 'Upgrading dashboard UI' },
    { id: 5, icon: FiCloud, title: 'API Health Check', status: 'Pending', description: 'Verifying API endpoints' },
    { id: 6, icon: FiCheckCircle, title: 'Final Testing', status: 'Pending', description: 'System integration testing' }
  ];

  const updateTimeline = [
    { id: 1, time: '10:00 AM', title: 'Maintenance Started', description: 'System taken offline for scheduled maintenance', status: 'Completed' },
    { id: 2, time: '10:15 AM', title: 'Backup Completed', description: 'Full database and file backup completed successfully', status: 'Completed' },
    { id: 3, time: '10:30 AM', title: 'Database Optimization', description: 'Optimizing database queries and indexes', status: 'In Progress' },
    { id: 4, time: '11:00 AM', title: 'Security Patches', description: 'Applying critical security updates', status: 'Pending' },
    { id: 5, time: '11:30 AM', title: 'Testing Phase', description: 'Running system integration tests', status: 'Pending' },
    { id: 6, time: '12:00 PM', title: 'System Restoration', description: 'Restoring system and verifying functionality', status: 'Pending' }
  ];

  return (
    <div className="maintenance-wrapper">
      {/* Header Branding */}
      <header className="maint-header">
        <div className="maint-header-branding">
          <FiLayers className="maint-branding-icon" />
          <span className="maint-branding-text">Project Management System</span>
        </div>
        <div className="maint-header-actions">
          <button className="maint-header-btn" onClick={() => showAlert('Contact support is frontend demo only.', 'info')}>
            <FiHeadphones className="me-1" /> Contact Support
          </button>
          <button className="maint-header-btn maint-header-btn-outline" onClick={() => window.location.href = '/'}>
            <FiArrowLeft className="me-1" /> Back to Login
          </button>
        </div>
      </header>

      {/* Alert Area */}
      {alert && (
        <div className="maint-alert-container">
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
      <main className="maint-main">
        <div className="maint-layout">
          {/* Left: Content */}
          <div className="maint-content">
            <div className="maint-content-card">
              <div className="maint-label">Scheduled Maintenance</div>
              <h1 className="maint-title">We'll Be Back Soon</h1>
              <p className="maint-subtitle">
                The Project Management System is currently under scheduled maintenance.
              </p>
              <p className="maint-description">
                We are upgrading our system to provide better performance, improved security, 
                faster dashboards, and a smoother project management experience.
              </p>
              <p className="maint-help-text">
                Thank you for your patience. Please check back shortly.
              </p>

              {/* Action Buttons */}
              <div className="maint-actions">
                <button className="btn btn-primary maint-action-btn" onClick={handleRefresh}>
                  <FiRefreshCw className="me-2" /> Refresh Page
                </button>
                <button className="btn btn-outline-primary maint-action-btn" onClick={() => showAlert('Contact support is frontend demo only.', 'info')}>
                  <FiHeadphones className="me-2" /> Contact Support
                </button>
                <button className="btn btn-light maint-action-btn" onClick={() => window.location.href = '/'}>
                  <FiArrowLeft className="me-2" /> Back to Login
                </button>
              </div>

              {/* Estimated Time Box */}
              <div className="maint-time-box">
                <h6 className="maint-time-title">
                  <FiClock className="me-2" /> Maintenance Schedule
                </h6>
                <div className="maint-time-grid">
                  <div className="maint-time-item">
                    <span className="maint-time-label">Started</span>
                    <span className="maint-time-value">10:00 AM</span>
                  </div>
                  <div className="maint-time-item">
                    <span className="maint-time-label">Expected Completion</span>
                    <span className="maint-time-value">12:00 PM</span>
                  </div>
                  <div className="maint-time-item">
                    <span className="maint-time-label">Current Status</span>
                    <span className="maint-time-value text-primary">In Progress</span>
                  </div>
                  <div className="maint-time-item">
                    <span className="maint-time-label">Remaining</span>
                    <span className="maint-time-value text-warning">~2 Hours</span>
                  </div>
                  <div className="maint-time-item">
                    <span className="maint-time-label">Type</span>
                    <span className="maint-time-value">Scheduled Upgrade</span>
                  </div>
                  <div className="maint-time-item">
                    <span className="maint-time-label">Reference ID</span>
                    <span className="maint-time-value">PMS-MAINT-2026</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="maint-progress-section">
                  <div className="maint-progress-header-row">
                    <span className="maint-progress-label">Current Progress</span>
                    <span className="maint-progress-percent">65%</span>
                  </div>
                  <div className="progress maint-progress-bar">
                    <div className="progress-bar" style={{ width: '65%' }}></div>
                  </div>
                  <p className="maint-progress-status">Applying system updates...</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="maint-steps">
                <div className="maint-step maint-step-completed">
                  <FiCheckCircle className="maint-step-icon" />
                  <span>Server backup completed</span>
                </div>
                <div className="maint-step maint-step-active">
                  <FiRefreshCw className="maint-step-icon maint-spin-slow" />
                  <span>Database optimization in progress</span>
                </div>
                <div className="maint-step">
                  <FiClock className="maint-step-icon" />
                  <span>Security patch update pending</span>
                </div>
                <div className="maint-step">
                  <FiClock className="maint-step-icon" />
                  <span>Final testing pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="maint-illustration-section">
            <MaintenanceIllustration />
          </div>
        </div>

        {/* Maintenance Status Section */}
        <div className="maint-status-section">
          <h3 className="maint-section-title">Maintenance Status</h3>
          <p className="maint-section-subtitle">Current progress of system maintenance tasks</p>
          <div className="maint-status-grid">
            {statusCards.map((card) => (
              <MaintenanceStatusCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                status={card.status}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Update Timeline & Notify Form */}
        <div className="maint-bottom-grid">
          <div className="maint-timeline-section">
            <h3 className="maint-section-title">Update Timeline</h3>
            <p className="maint-section-subtitle">Real-time maintenance progress</p>
            <div className="maint-timeline">
              {updateTimeline.map((update) => (
                <MaintenanceUpdateCard
                  key={update.id}
                  time={update.time}
                  title={update.title}
                  description={update.description}
                  status={update.status}
                />
              ))}
            </div>
          </div>

          <div className="maint-notify-section">
            <div className="maint-notify-card">
              <h6 className="maint-notify-title">
                <FiSend className="me-2" /> Notify Me When Live
              </h6>
              <p className="maint-notify-desc">
                Get notified when the system is back online.
              </p>
              <form onSubmit={handleNotifySubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <div className="maint-input-wrapper">
                    <FiUser className="maint-input-icon" />
                    <input
                      type="text"
                      name="name"
                      className={`form-control maint-input ${formErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your name"
                      value={notifyForm.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.name && <div className="invalid-feedback d-block">{formErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <div className="maint-input-wrapper">
                    <FiMail className="maint-input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-control maint-input ${formErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                      value={notifyForm.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.email && <div className="invalid-feedback d-block">{formErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role *</label>
                  <div className="maint-input-wrapper">
                    <FiUsers className="maint-input-icon" />
                    <select
                      name="role"
                      className={`form-select maint-input ${formErrors.role ? 'is-invalid' : ''}`}
                      value={notifyForm.role}
                      onChange={handleFormChange}
                    >
                      <option value="">Select your role</option>
                      <option value="Admin">Admin</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Team Member">Team Member</option>
                      <option value="Client">Client</option>
                    </select>
                  </div>
                  {formErrors.role && <div className="invalid-feedback d-block">{formErrors.role}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Message (Optional)</label>
                  <textarea
                    name="message"
                    className="form-control maint-textarea"
                    rows="2"
                    placeholder="Any additional message..."
                    value={notifyForm.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary maint-submit-btn">
                  <FiSend className="me-2" /> Notify Me When Live
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="maint-footer">
        <p>© 2026 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Maintenance;