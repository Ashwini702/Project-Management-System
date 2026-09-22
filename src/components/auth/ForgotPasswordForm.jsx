import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft, FiCheckCircle, FiMail } from 'react-icons/fi';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  if (sent) {
    return (
      <div className="forgot-password-card">
        <div className="success-content">
          <div className="success-icon-wrapper">
            <FiCheckCircle className="success-icon" />
          </div>
          <h3 className="success-title">Reset Link Sent</h3>
          <p className="success-message">
            Check your email for password reset instructions.
          </p>
          <button className="btn btn-primary w-100" onClick={() => navigate('/login', { replace: true })}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-card">
      <div className="card-header-auth">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your registered email address to receive reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-3">
          <label htmlFor="forgotEmail" className="form-label">Email Address</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon">
              <FiMail />
            </span>
            <input
              type="email"
              id="forgotEmail"
              className={`form-control input-with-icon ${error ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              disabled={loading}
            />
          </div>
          {error && (
            <div className="invalid-feedback d-block">
              <FiAlertCircle className="me-1" />
              {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary submit-btn w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>

        <div className="back-link-wrapper">
          <button type="button" className="back-link" onClick={() => navigate('/login')}>
            <FiArrowLeft className="me-1" />
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
