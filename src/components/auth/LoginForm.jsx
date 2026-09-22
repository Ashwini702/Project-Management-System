// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiUser, 
  FiLogIn 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getDashboardPathByRole } from '../../utils/authUtils';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    remember: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginAlert, setLoginAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = ['Admin', 'Project Manager', 'Team Member', 'Client'];

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setLoading(false);
        setLoginAlert({
          type: 'danger',
          message: result.message
        });
        return;
      }

      if (result.user.role !== formData.role) {
        setLoading(false);
        setLoginAlert({
          type: 'danger',
          message: `This account is registered as ${result.user.role}. Please select the correct role.`
        });
        return;
      }

      setLoginAlert({
        type: 'success',
        message: 'Login successful! Redirecting to dashboard...'
      });

      const dashboardPath = result.dashboardPath || getDashboardPathByRole(result.user.role);
      setLoading(false);
      navigate(dashboardPath, { replace: true });
      return;
    }

    setLoginAlert({
      type: 'danger',
      message: 'Please fix the errors below to continue.'
    });
  };

  return (
    <div className="login-card">
      <div className="card-header text-center">
        <div className="form-logo">
          <span className="logo-badge">PMS</span>
        </div>
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login to continue to your dashboard</p>
      </div>

      {loginAlert && (
        <div className={`alert alert-${loginAlert.type} alert-dismissible fade show`} role="alert">
          {loginAlert.message}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setLoginAlert(null)}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="mb-3 input-group-custom">
          <label htmlFor="email" className="form-label">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FiMail />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3 input-group-custom">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FiLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>

        {/* Role Dropdown */}
        <div className="mb-3 input-group-custom">
          <label htmlFor="role" className="form-label">Login As</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FiUser />
            </span>
            <select
              id="role"
              name="role"
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          {errors.role && <div className="invalid-feedback d-block">{errors.role}</div>}
        </div>

        {/* Remember & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="form-check-input"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-primary login-btn w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : (
            <>
              <FiLogIn className="me-2" />
              Login to Dashboard
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="text-center mt-3 register-text">
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;



