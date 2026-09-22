// src/pages/auth/Register.jsx
import React from 'react';
import AuthIllustration from '../../components/auth/AuthIllustration';
import RegisterForm from '../../components/auth/RegisterForm';
import '../../styles/register.css';

const Register = () => {
  return (
    <div className="register-wrapper">
      <div className="register-container">
        {/* Left Illustration Section */}
        <div className="register-illustration-section">
          <AuthIllustration />
        </div>

        {/* Right Form Section */}
        <div className="register-form-section">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;