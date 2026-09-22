// src/pages/auth/Login.jsx
import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { 
  FiCheckCircle, 
  FiUsers, 
  FiCalendar, 
  FiBarChart2, 
  FiLayers, 
  FiActivity 
} from 'react-icons/fi';
import '../../styles/auth.css';

const Login = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Branding Section */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="branding-header">
              <div className="branding-logo">
                <FiLayers className="logo-icon" />
                <span className="logo-text">PMS</span>
              </div>
              <h1 className="branding-title">Project Management System</h1>
              <p className="branding-tagline">
                Manage projects, tasks, teams, and clients from one powerful dashboard.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="feature-list">
              <div className="feature-item glass-card">
                <div className="feature-icon-wrapper">
                  <FiBarChart2 className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Track Projects</h4>
                  <p className="feature-desc">Monitor progress in real-time</p>
                </div>
              </div>

              <div className="feature-item glass-card">
                <div className="feature-icon-wrapper">
                  <FiUsers className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Manage Teams</h4>
                  <p className="feature-desc">Collaborate efficiently</p>
                </div>
              </div>

              <div className="feature-item glass-card">
                <div className="feature-icon-wrapper">
                  <FiCalendar className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Monitor Deadlines</h4>
                  <p className="feature-desc">Never miss a milestone</p>
                </div>
              </div>
            </div>

            {/* Abstract Dashboard Illustration using CSS shapes */}
            <div className="dashboard-illustration">
              <div className="abstract-card card-1">
                <div className="card-bar"></div>
                <div className="card-bar short"></div>
                <div className="card-dot"></div>
              </div>
              <div className="abstract-card card-2">
                <div className="card-circle"></div>
                <div className="card-line"></div>
                <div className="card-line short-line"></div>
              </div>
              <div className="abstract-card card-3">
                <div className="card-pie"></div>
                <div className="card-stats">
                  <div className="stat-bar"></div>
                  <div className="stat-bar"></div>
                </div>
              </div>
              <div className="abstract-blob"></div>
              <div className="abstract-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="auth-form-section">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

// Updated Login Page Integration Example
// This is a snippet showing how to integrate AuthContext into the existing Login page
// Add this to your existing LoginForm component

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDashboardPathByRole } from '../../utils/authUtils';

// Inside your LoginForm component:
const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = login(email, password);
      
      if (result.success) {
        const dashboardPath = getDashboardPathByRole(result.user.role);
        navigate(dashboardPath, { replace: true });
      } else {
        setError(result.message);
      }
      
      setLoading(false);
    }, 800);
  };

  // ... rest of your form component
};
*/
