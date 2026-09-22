// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiEye, FiEyeOff, FiCheck, FiX, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import RegisterRoleCard from './RegisterRoleCard';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(null);
  const [touched, setTouched] = useState({});

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

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) newErrors.phone = 'Phone must be at least 10 digits';

    if (!formData.role) newErrors.role = 'Please select a role';

    if (!formData.company.trim()) newErrors.company = 'Company/organization name is required';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!allChecksPassed) newErrors.password = 'Password does not meet all requirements';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.terms) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setAlert(null);
    if (type !== 'checkbox') setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, role: true, company: true, password: true, confirmPassword: true, terms: true });

    if (!validateForm()) return;

    if (formData.email === 'existing@example.com') {
      setAlert({ type: 'danger', message: 'This email is already registered. Please use another email address.' });
      return;
    }

    setLoading(true);
    setAlert(null);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', role: '', company: '', password: '', confirmPassword: '', terms: false });
    setErrors({});
    setTouched({});
    setSuccess(false);
    setAlert(null);
  };

  const handleGoToLogin = () => {
    window.location.href = '/';
  };

  if (success) {
    return (
      <div className="register-card">
        <div className="success-content">
          <div className="success-icon-wrapper">
            <FiCheckCircle className="success-icon" />
          </div>
          <h3 className="success-title">Account Created Successfully!</h3>
          <p className="success-message">
            Your account has been created successfully. You can now login to access your dashboard.
          </p>
          <div className="success-role-box">
            <span>Registered as:</span>
            <strong>{formData.role}</strong>
          </div>
          <div className="success-actions">
            <button className="btn btn-primary w-100" onClick={handleGoToLogin}>
              Go to Login
            </button>
            <button className="btn btn-outline-primary w-100" onClick={handleReset}>
              Register Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-card">
      <div className="card-header-auth">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Register to access your project management workspace.
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
        {/* Full Name */}
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiUser /></span>
            <input type="text" id="name" name="name" className={`form-control input-with-icon ${errors.name && touched.name ? 'is-invalid' : ''}`} placeholder="Enter your full name" value={formData.name} onChange={handleChange} disabled={loading} />
          </div>
          {errors.name && touched.name && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiMail /></span>
            <input type="email" id="email" name="email" className={`form-control input-with-icon ${errors.email && touched.email ? 'is-invalid' : ''}`} placeholder="Enter your email" value={formData.email} onChange={handleChange} disabled={loading} />
          </div>
          {errors.email && touched.email && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiPhone /></span>
            <input type="tel" id="phone" name="phone" className={`form-control input-with-icon ${errors.phone && touched.phone ? 'is-invalid' : ''}`} placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} disabled={loading} />
          </div>
          {errors.phone && touched.phone && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.phone}</div>}
        </div>

        {/* Role Selection */}
        <div className="form-group mb-3">
          <label className="form-label">Select Role *</label>
          <RegisterRoleCard selectedRole={formData.role} onSelect={handleRoleSelect} />
          {errors.role && <div className="invalid-feedback d-block mt-1"><FiAlertCircle className="me-1" />{errors.role}</div>}
        </div>

        {/* Company */}
        <div className="form-group mb-3">
          <label htmlFor="company" className="form-label">Company / Organization *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiBriefcase /></span>
            <input type="text" id="company" name="company" className={`form-control input-with-icon ${errors.company && touched.company ? 'is-invalid' : ''}`} placeholder="Enter your company name" value={formData.company} onChange={handleChange} disabled={loading} />
          </div>
          {errors.company && touched.company && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.company}</div>}
        </div>

        {/* Password */}
        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label">Password *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiLock /></span>
            <input type={showPassword.password ? 'text' : 'password'} id="password" name="password" className={`form-control input-with-icon input-with-toggle ${errors.password && touched.password ? 'is-invalid' : ''}`} placeholder="Create a password" value={formData.password} onChange={handleChange} disabled={loading} />
            <button type="button" className="password-toggle-btn" onClick={() => toggleShowPassword('password')} tabIndex="-1">{showPassword.password ? <FiEyeOff /> : <FiEye />}</button>
          </div>
          {errors.password && touched.password && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.password}</div>}
        </div>

        {/* Password Strength */}
        {formData.password && (
          <div className="password-strength-section mb-3">
            <div className="strength-header">
              <span className="strength-label">Password Strength:</span>
              <span className="strength-level" style={{ color: passwordStrength.color }}>{passwordStrength.level}</span>
            </div>
            <div className="progress strength-progress">
              <div className="progress-bar" style={{ width: `${passwordStrength.percentage}%`, backgroundColor: passwordStrength.color }}></div>
            </div>
            <div className="password-checklist mt-2">
              {passwordChecks.map((check, index) => (
                <div key={index} className={`checklist-item ${check.passed ? 'passed' : ''}`}>
                  {check.passed ? <FiCheck className="check-icon passed" /> : <FiX className="check-icon failed" />}<span>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><FiLock /></span>
            <input type={showPassword.confirm ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" className={`form-control input-with-icon input-with-toggle ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} disabled={loading} />
            <button type="button" className="password-toggle-btn" onClick={() => toggleShowPassword('confirm')} tabIndex="-1">{showPassword.confirm ? <FiEyeOff /> : <FiEye />}</button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.confirmPassword}</div>}
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <div className="valid-feedback d-block"><FiCheck className="me-1" />Passwords match</div>
          )}
        </div>

        {/* Terms */}
        <div className="form-check mb-4">
          <input type="checkbox" id="terms" name="terms" className={`form-check-input ${errors.terms && touched.terms ? 'is-invalid' : ''}`} checked={formData.terms} onChange={handleChange} disabled={loading} />
          <label htmlFor="terms" className="form-check-label">
            I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </label>
          {errors.terms && touched.terms && <div className="invalid-feedback d-block"><FiAlertCircle className="me-1" />{errors.terms}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary submit-btn w-100" disabled={loading}>
          {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Creating Account...</>) : 'Create Account'}
        </button>

        <div className="login-link-wrapper">
          <span className="login-link-text">Already have an account?</span>
          <button type="button" className="login-link" onClick={handleGoToLogin}>
            <FiArrowLeft className="me-1" />Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;