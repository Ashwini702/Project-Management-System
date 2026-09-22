// src/components/auth/ResetPasswordForm.jsx
import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiX, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(null);

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score === 0) return { level: '', percentage: 0, color: '' };
    if (score <= 2) return { level: 'Weak', percentage: 25, color: 'var(--danger-color)' };
    if (score === 3) return { level: 'Medium', percentage: 50, color: 'var(--warning-color)' };
    if (score === 4) return { level: 'Strong', percentage: 75, color: 'var(--primary-color)' };
    return { level: 'Very Strong', percentage: 100, color: 'var(--success-color)' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Password checklist
  const passwordChecks = [
    { label: 'Minimum 8 characters', passed: formData.password.length >= 8 },
    { label: 'At least one uppercase letter', passed: /[A-Z]/.test(formData.password) },
    { label: 'At least one lowercase letter', passed: /[a-z]/.test(formData.password) },
    { label: 'At least one number', passed: /[0-9]/.test(formData.password) },
    { label: 'At least one special character', passed: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
  ];

  const allChecksPassed = passwordChecks.every(check => check.passed);

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!allChecksPassed) {
      newErrors.password = 'Password does not meet all requirements';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setAlert(null);
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Demo: Check for demo password
    if (formData.password === 'Password@123') {
      setAlert({ type: 'warning', message: 'For demo security, please choose a different password.' });
      return;
    }

    setLoading(true);
    setAlert(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    // If React Router is configured, use: navigate('/login')
    window.location.href = '/';
  };

  // Success State
  if (success) {
    return (
      <div className="reset-password-card">
        <div className="success-content">
          <div className="success-icon-wrapper">
            <FiCheckCircle className="success-icon" />
          </div>
          <h3 className="success-title">Password Reset Successful!</h3>
          <p className="success-message">
            Your password has been updated successfully. You can now login with your new password.
          </p>
          <div className="success-actions">
            <button className="btn btn-primary w-100" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form State
  return (
    <div className="reset-password-card">
      <div className="card-header-auth">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Enter your new password below to regain access to your account.
        </p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.type === 'danger' && <FiAlertCircle className="me-2" />}
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* New Password Field */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon">
              <FiLock />
            </span>
            <input
              type={showPassword.password ? 'text' : 'password'}
              id="password"
              name="password"
              className={`form-control input-with-icon input-with-toggle ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => toggleShowPassword('password')}
              tabIndex="-1"
            >
              {showPassword.password ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              <FiAlertCircle className="me-1" />
              {errors.password}
            </div>
          )}
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="password-strength-section mb-3">
            <div className="strength-header">
              <span className="strength-label">Password Strength:</span>
              <span className="strength-level" style={{ color: passwordStrength.color }}>
                {passwordStrength.level}
              </span>
            </div>
            <div className="progress strength-progress">
              <div
                className="progress-bar"
                style={{
                  width: `${passwordStrength.percentage}%`,
                  backgroundColor: passwordStrength.color
                }}
              ></div>
            </div>

            {/* Password Checklist */}
            <div className="password-checklist mt-2">
              {passwordChecks.map((check, index) => (
                <div key={index} className={`checklist-item ${check.passed ? 'passed' : ''}`}>
                  {check.passed ? (
                    <FiCheck className="check-icon passed" />
                  ) : (
                    <FiX className="check-icon failed" />
                  )}
                  <span>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password Field */}
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon">
              <FiLock />
            </span>
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control input-with-icon input-with-toggle ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => toggleShowPassword('confirm')}
              tabIndex="-1"
            >
              {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">
              <FiAlertCircle className="me-1" />
              {errors.confirmPassword}
            </div>
          )}
          {/* Password Match Indicator */}
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <div className="valid-feedback d-block">
              <FiCheck className="me-1" />
              Passwords match
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-btn w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Resetting...
            </>
          ) : (
            'Reset Password'
          )}
        </button>

        <div className="back-link-wrapper">
          <button
            type="button"
            className="back-link"
            onClick={handleBackToLogin}
          >
            <FiArrowLeft className="me-1" />
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;