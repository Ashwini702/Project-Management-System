// src/pages/error/ComingSoon.jsx
import React, { useState } from 'react';
import ComingSoonIllustration from '../../components/error/ComingSoonIllustration';
import FeaturePreviewCard from '../../components/error/FeaturePreviewCard';
import LaunchUpdateCard from '../../components/error/LaunchUpdateCard';
import {
  FiLayers,
  FiArrowLeft,
  FiHome,
  FiCompass,
  FiSend,
  FiMail,
  FiUser,
  FiUsers,
  FiBarChart2,
  FiFileText,
  FiUsers as FiTeamIcon,
  FiCheckSquare,
  FiFileText as FiFilesIcon,
  FiBell,
  FiAlertCircle,
  FiInfo,
  FiX
} from 'react-icons/fi';
import '../../styles/comingSoon.css';

const ComingSoon = () => {
  const [notifyForm, setNotifyForm] = useState({
    name: '',
    email: '',
    role: '',
    feature: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
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
    if (!notifyForm.feature) errors.feature = 'Please select a feature';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!validateNotifyForm()) return;
    showAlert('You will be notified when this feature is available! This is frontend demo only.', 'success');
    setNotifyForm({ name: '', email: '', role: '', feature: '', message: '' });
  };

  const featureCards = [
    { id: 1, icon: FiBarChart2, title: 'Smart Project Insights', description: 'AI-powered analytics and project health monitoring dashboard.', status: 'In Progress' },
    { id: 2, icon: FiFileText, title: 'Advanced Reports', description: 'Customizable reports with export to PDF, Excel, and CSV formats.', status: 'Testing' },
    { id: 3, icon: FiTeamIcon, title: 'Team Collaboration', description: 'Real-time team chat, video meetings, and document collaboration.', status: 'Planned' },
    { id: 4, icon: FiCheckSquare, title: 'Client Approval Workflow', description: 'Streamlined approval process with digital signatures and tracking.', status: 'In Progress' },
    { id: 5, icon: FiFilesIcon, title: 'File Management Upgrade', description: 'Cloud storage integration with version control and smart search.', status: 'Coming Soon' },
    { id: 6, icon: FiBell, title: 'Real-time Notifications', description: 'Push notifications, email alerts, and WhatsApp integration.', status: 'Planned' }
  ];

  const launchUpdates = [
    { id: 1, date: 'June 15', title: 'Feature Planning Completed', description: 'Requirements gathered and feature roadmap finalized.', status: 'Completed' },
    { id: 2, date: 'June 20', title: 'UI Design Completed', description: 'User interface designs approved by stakeholders.', status: 'Completed' },
    { id: 3, date: 'July 01', title: 'Frontend Development', description: 'React components and responsive layouts in progress.', status: 'In Progress' },
    { id: 4, date: 'July 08', title: 'Testing Phase', description: 'Unit testing and integration testing scheduled.', status: 'Pending' },
    { id: 5, date: 'July 12', title: 'Final Review', description: 'Stakeholder review and feedback collection.', status: 'Pending' },
    { id: 6, date: 'July 15', title: 'Launch Coming Soon', description: 'Feature release and deployment.', status: 'Pending' }
  ];

  return (
    <div className="coming-soon-wrapper">
      {/* Header Branding */}
      <header className="cs-header">
        <div className="cs-header-branding">
          <FiLayers className="cs-branding-icon" />
          <span className="cs-branding-text">Project Management System</span>
        </div>
        <div className="cs-header-actions">
          <button className="cs-header-btn" onClick={() => showAlert('Dashboard is frontend demo only.', 'info')}>
            <FiHome className="me-1" /> Dashboard
          </button>
          <button className="cs-header-btn cs-header-btn-outline" onClick={() => window.location.href = '/'}>
            <FiArrowLeft className="me-1" /> Back to Login
          </button>
        </div>
      </header>

      {/* Alert Area */}
      {alert && (
        <div className="cs-alert-container">
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
      <main className="cs-main">
        <div className="cs-layout">
          {/* Left: Content */}
          <div className="cs-content">
            <div className="cs-content-card">
              <div className="cs-label">Coming Soon</div>
              <h1 className="cs-title">Something Great Is Coming Soon</h1>
              <p className="cs-subtitle">
                We are working on this feature to make your project management experience better.
              </p>
              <p className="cs-description">
                This module is currently under development. Soon you will be able to access new tools, 
                smart dashboards, advanced reports, workflow automation, and improved collaboration features.
              </p>
              <p className="cs-help-text">
                Stay tuned! You can subscribe below to get notified when this feature is live.
              </p>

              {/* Countdown Timer */}
              <div className="cs-countdown-section">
                <div className="cs-countdown-header">
                  <span className="cs-countdown-label">Expected Launch</span>
                  <span className="cs-countdown-date">July 15, 2026</span>
                </div>
                <div className="cs-countdown-timer">
                  <div className="cs-timer-card">
                    <span className="cs-timer-value">12</span>
                    <span className="cs-timer-unit">Days</span>
                  </div>
                  <div className="cs-timer-card">
                    <span className="cs-timer-value">08</span>
                    <span className="cs-timer-unit">Hours</span>
                  </div>
                  <div className="cs-timer-card">
                    <span className="cs-timer-value">45</span>
                    <span className="cs-timer-unit">Minutes</span>
                  </div>
                  <div className="cs-timer-card">
                    <span className="cs-timer-value">20</span>
                    <span className="cs-timer-unit">Seconds</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="cs-actions">
                <button className="btn btn-primary cs-action-btn" onClick={() => showAlert('Dashboard is frontend demo only.', 'info')}>
                  <FiHome className="me-2" /> Back to Dashboard
                </button>
                <button className="btn btn-outline-primary cs-action-btn" onClick={() => showAlert('Explore features is frontend demo only.', 'info')}>
                  <FiCompass className="me-2" /> Explore Current Features
                </button>
                <button className="btn btn-light cs-action-btn" onClick={() => window.location.href = '/'}>
                  <FiArrowLeft className="me-2" /> Back to Login
                </button>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="cs-illustration-section">
            <ComingSoonIllustration />
          </div>
        </div>

        {/* Feature Preview Section */}
        <div className="cs-feature-section">
          <h3 className="cs-section-title">Feature Previews</h3>
          <p className="cs-section-subtitle">Exciting features coming to your workspace</p>
          <div className="cs-feature-grid">
            {featureCards.map((card) => (
              <FeaturePreviewCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                status={card.status}
              />
            ))}
          </div>
        </div>

        {/* Launch Update & Notify */}
        <div className="cs-bottom-grid">
          <div className="cs-launch-section">
            <h3 className="cs-section-title">Launch Progress</h3>
            <p className="cs-section-subtitle">Development and deployment timeline</p>
            <div className="cs-launch-timeline">
              {launchUpdates.map((update) => (
                <LaunchUpdateCard
                  key={update.id}
                  date={update.date}
                  title={update.title}
                  description={update.description}
                  status={update.status}
                />
              ))}
            </div>
          </div>

          <div className="cs-notify-section">
            <div className="cs-notify-card">
              <h6 className="cs-notify-title">
                <FiSend className="me-2" /> Notify Me When Available
              </h6>
              <p className="cs-notify-desc">
                Get notified when this feature is live.
              </p>
              <form onSubmit={handleNotifySubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <div className="cs-input-wrapper">
                    <FiUser className="cs-input-icon" />
                    <input
                      type="text"
                      name="name"
                      className={`form-control cs-input ${formErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your name"
                      value={notifyForm.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.name && <div className="invalid-feedback d-block">{formErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <div className="cs-input-wrapper">
                    <FiMail className="cs-input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-control cs-input ${formErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                      value={notifyForm.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  {formErrors.email && <div className="invalid-feedback d-block">{formErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role *</label>
                  <div className="cs-input-wrapper">
                    <FiUsers className="cs-input-icon" />
                    <select
                      name="role"
                      className={`form-select cs-input ${formErrors.role ? 'is-invalid' : ''}`}
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
                  <label className="form-label">Interested Feature *</label>
                  <select
                    name="feature"
                    className={`form-select cs-input ${formErrors.feature ? 'is-invalid' : ''}`}
                    value={notifyForm.feature}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a feature</option>
                    <option value="Smart Project Insights">Smart Project Insights</option>
                    <option value="Advanced Reports">Advanced Reports</option>
                    <option value="Team Collaboration">Team Collaboration Tools</option>
                    <option value="Client Approval">Client Approval Workflow</option>
                    <option value="File Management">File Management Upgrade</option>
                    <option value="Notifications">Real-time Notifications</option>
                  </select>
                  {formErrors.feature && <div className="invalid-feedback d-block">{formErrors.feature}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Message (Optional)</label>
                  <textarea
                    name="message"
                    className="form-control cs-textarea"
                    rows="2"
                    placeholder="Any additional message..."
                    value={notifyForm.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary cs-submit-btn">
                  <FiSend className="me-2" /> Notify Me When Available
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="cs-footer">
        <p>© 2026 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComingSoon;