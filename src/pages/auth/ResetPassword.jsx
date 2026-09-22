// src/pages/auth/ResetPassword.jsx
import React from 'react';
import AuthIllustration from '../../components/auth/AuthIllustration';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import '../../styles/resetPassword.css';

const ResetPassword = () => {
  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-container">
        {/* Left Illustration Section */}
        <div className="reset-password-illustration-section">
          <AuthIllustration />
        </div>

        {/* Right Form Section */}
        <div className="reset-password-form-section">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;