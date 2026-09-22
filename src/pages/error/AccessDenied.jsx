// src/pages/error/AccessDenied.jsx
import React, { useEffect, useState } from 'react';
import AccessDeniedIllustration from '../../components/error/AccessDeniedIllustration';
import PermissionInfoCard from '../../components/error/PermissionInfoCard';
import {
  FiLayers,
  FiArrowLeft,
  FiHome,
  FiShield,
  FiUserCheck,
  FiUsers,
  FiBriefcase,
  FiLogIn,
  FiHeadphones,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiSend,
  FiMail,
  FiUser,
  FiFileText,
  FiLock
} from 'react-icons/fi';
import '../../styles/accessDenied.css';

const AccessDenied = () => {
  const [accessForm, setAccessForm] = useState({
    name: '',
    email: '',
    requestedPage: '/admin/settings',
    reason: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pms_auth_user');
      const user = raw ? JSON.parse(raw) : null;
      const role = String(user?.role || user?.user_role || '').toLowerCase().replace(/[^a-z]/g, '');
      if (role === 'team' || role === 'teammember' || role === 'teammembers') {
        window.location.replace('/team/dashboard');
      }
    } catch (_) {}
  }, []);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDashboardClick = () => {
    let role = '';
    try {
      const raw = localStorage.getItem('pms_auth_user') || localStorage.getItem('pms_user') || localStorage.getItem('user');
      const user = raw ? JSON.parse(raw) : null;
      role = String(user?.role || user?.user_role || '').toLowerCase();
    } catch (_) {}
    const destination = role.includes('team') ? '/team/dashboard' : role.includes('manager') ? '/manager/dashboard' : role.includes('client') ? '/client/dashboard' : '/admin/dashboard';
    window.location.assign(destination);
  };

  const handlePermissionCardClick = (destination) => {
    showAlert(`${destination} is frontend demo only.`, 'info');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAccessForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAccessForm = () => {
    const errors = {};
    if (!accessForm.name.trim()) errors.name = 'Name is required';
    if (!accessForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accessForm.email)) errors.email = 'Valid email is required';
    if (!accessForm.requestedPage.trim()) errors.requestedPage = 'Requested page is required';
    if (!accessForm.reason.trim()) errors.reason = 'Reason is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAccessRequest = (e) => {
    e.preventDefault();
    if (!validateAccessForm()) return;
    showAlert('Access request submitted successfully! This is frontend demo only.', 'success');
    setAccessForm({ name: '', email: '', requestedPage: '/admin/settings', reason: '' });
  };

  // If React Router is configured, use:
  // const navigate = useNavigate();
  // const handleGoBack = () => navigate(-1);
  // const handleGoHome = () => navigate('/');

  const permissionCards = [
    { id: 1, icon: FiShield, title: 'Admin Only Area', description: 'Requires administrator privileges', destination: 'Admin Access' },
    { id: 2, icon: FiUserCheck, title: 'Manager Restricted', description: 'Project manager access needed', destination: 'Manager Access' },
    { id: 3, icon: FiUsers, title: 'Team Member Access', description: 'Team member workspace', destination: 'Team Access' },
    { id: 4, icon: FiBriefcase, title: 'Client Portal Access', description: 'Client project portal access', destination: 'Client Access' },
    { id: 5, icon: FiLogIn, title: 'Login Required', description: 'Authenticate to continue', destination: 'Login' },
    { id: 6, icon: FiHeadphones, title: 'Contact Admin', description: 'Request access from admin', destination: 'Support' }
  ];

  return (
    <div className="access-denied-wrapper">
      {/* Header Branding */}
      <header className="ad-header">
        <div className="ad-header-branding">
          <FiLayers className="ad-branding-icon" />
          <span className="ad-branding-text">Project Management System</span>
        </div>
        <div className="ad-header-actions">
          <button className="ad-header-btn" onClick={handleDashboardClick}>
            <FiHome className="me-1" /> My Dashboard
          </button>
          <button className="ad-header-btn ad-header-btn-outline" onClick={handleDashboardClick}>
            <FiArrowLeft className="me-1" /> Back to Login
          </button>
        </div>
      </header>

      {/* Alert Area */}
      {alert && (
        <div className="ad-alert-container">
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
      <main className="ad-main">
        <div className="ad-layout">
          {/* Left: Error Content */}
          <div className="ad-content">
            <div className="ad-content-card">
              <div className="ad-label">403 Error</div>
              <h1 className="ad-title">Access Denied</h1>
              <p className="ad-message">
                You do not have permission to view this page.
              </p>
              <p className="ad-help-text">
                Please contact your administrator if you believe this is a mistake, or return to an authorized dashboard.
              </p>

              {/* Action Buttons */}
              <div className="ad-actions">
                <button className="btn btn-primary ad-action-btn" onClick={handleDashboardClick}>
                  <FiHome className="me-2" /> Go to My Dashboard
                </button>
                <button className="btn btn-outline-primary ad-action-btn" onClick={handleDashboardClick}>
                  <FiArrowLeft className="me-2" /> Back to Login
                </button>
                <button className="btn btn-light ad-action-btn" onClick={handleGoBack}>
                  <FiArrowLeft className="me-2" /> Go Back
                </button>
              </div>

              {/* Access Status Box */}
              <div className="ad-access-box">
                <h6 className="ad-access-title">
                  <FiShield className="me-2" /> Current Access Status
                </h6>
                <div className="ad-access-grid">
                  <div className="ad-access-item">
                    <span className="ad-access-label">Requested Page</span>
                    <span className="ad-access-value">
                      <FiFileText className="me-1" />/admin/settings
                    </span>
                  </div>
                  <div className="ad-access-item">
                    <span className="ad-access-label">Required Role</span>
                    <span className="ad-access-value">
                      <FiShield className="me-1" />Admin
                    </span>
                  </div>
                  <div className="ad-access-item">
                    <span className="ad-access-label">Your Role</span>
                    <span className="ad-access-value">
                      <FiUsers className="me-1" />Team Member
                    </span>
                  </div>
                  <div className="ad-access-item">
                    <span className="ad-access-label">Access Status</span>
                    <span className="ad-access-value text-danger">
                      <FiLock className="me-1" />Denied
                    </span>
                  </div>
                  <div className="ad-access-item ad-access-full">
                    <span className="ad-access-label">Request ID</span>
                    <span className="ad-access-value">PMS-403-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Access Form */}
            <div className="ad-request-card">
              <h6 className="ad-request-title">
                <FiSend className="me-2" /> Request Access
              </h6>
              <p className="ad-request-desc">
                Submit a request to the administrator to gain access to this page.
              </p>
              <form onSubmit={handleAccessRequest} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Your Name *</label>
                    <div className="ad-input-wrapper">
                      <FiUser className="ad-input-icon" />
                      <input
                        type="text"
                        name="name"
                        className={`form-control ad-input ${formErrors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your name"
                        value={accessForm.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    {formErrors.name && <div className="invalid-feedback d-block">{formErrors.name}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Your Email *</label>
                    <div className="ad-input-wrapper">
                      <FiMail className="ad-input-icon" />
                      <input
                        type="email"
                        name="email"
                        className={`form-control ad-input ${formErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={accessForm.email}
                        onChange={handleFormChange}
                      />
                    </div>
                    {formErrors.email && <div className="invalid-feedback d-block">{formErrors.email}</div>}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Requested Page *</label>
                    <div className="ad-input-wrapper">
                      <FiFileText className="ad-input-icon" />
                      <input
                        type="text"
                        name="requestedPage"
                        className={`form-control ad-input ${formErrors.requestedPage ? 'is-invalid' : ''}`}
                        placeholder="/admin/settings"
                        value={accessForm.requestedPage}
                        onChange={handleFormChange}
                      />
                    </div>
                    {formErrors.requestedPage && <div className="invalid-feedback d-block">{formErrors.requestedPage}</div>}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Reason for Access *</label>
                    <textarea
                      name="reason"
                      className={`form-control ad-textarea ${formErrors.reason ? 'is-invalid' : ''}`}
                      rows="3"
                      placeholder="Explain why you need access to this page..."
                      value={accessForm.reason}
                      onChange={handleFormChange}
                    ></textarea>
                    {formErrors.reason && <div className="invalid-feedback d-block">{formErrors.reason}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ad-submit-btn">
                  <FiSend className="me-2" /> Submit Access Request
                </button>
              </form>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="ad-illustration-section">
            <AccessDeniedIllustration />
          </div>
        </div>

        {/* Permission Info Cards */}
        <div className="ad-perm-section">
          <h3 className="ad-perm-title">Permission Information</h3>
          <p className="ad-perm-subtitle">Understand access levels and requirements</p>
          <div className="ad-perm-grid">
            {permissionCards.map((card) => (
              <PermissionInfoCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                onClick={() => handlePermissionCardClick(card.destination)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="ad-footer">
        <p>© 2026 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AccessDenied;