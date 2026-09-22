// src/pages/auth/ForgotPassword.jsx
import React from 'react';
import AuthIllustration from '../../components/auth/AuthIllustration';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import '../../styles/forgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        {/* Left Illustration Section */}
        <div className="forgot-password-illustration-section">
          <AuthIllustration />
        </div>

        {/* Right Form Section */}
        <div className="forgot-password-form-section">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;