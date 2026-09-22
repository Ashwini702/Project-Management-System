// src/components/auth/AuthIllustration.jsx
import React from 'react';
import { FiLock, FiCheckCircle, FiMail, FiUserCheck } from 'react-icons/fi';

const AuthIllustration = () => (
  <div className="auth-illustration">
    <div className="illustration-content">
      <div className="illustration-icon-wrapper">
        <div className="illustration-icon-circle">
          <FiLock className="illustration-lock-icon" />
        </div>
      </div>
      <h2 className="illustration-title">Project Management System</h2>
      <p className="illustration-subtitle">
        Securely reset your password and regain access to your project workspace.
      </p>
      <div className="illustration-features">
        <div className="illustration-feature-item">
          <div className="feature-icon-box">
            <FiCheckCircle />
          </div>
          <span>Secure password recovery</span>
        </div>
        <div className="illustration-feature-item">
          <div className="feature-icon-box">
            <FiUserCheck />
          </div>
          <span>Role-based account access</span>
        </div>
        <div className="illustration-feature-item">
          <div className="feature-icon-box">
            <FiMail />
          </div>
          <span>Email verification demo</span>
        </div>
        <div className="illustration-feature-item">
          <div className="feature-icon-box">
            <FiCheckCircle />
          </div>
          <span>Fast and simple reset process</span>
        </div>
      </div>
      <div className="illustration-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  </div>
);

export default AuthIllustration;