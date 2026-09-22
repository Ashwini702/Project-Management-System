// src/components/error/AccessDeniedIllustration.jsx
import React from 'react';
import { FiShield, FiLock, FiUser, FiSettings, FiFolder, FiAlertTriangle } from 'react-icons/fi';

const AccessDeniedIllustration = () => {
  return (
    <div className="access-denied-illustration">
      <div className="ad-illustration-main">
        {/* Large 403 Number */}
        <div className="ad-number-wrapper">
          <h1 className="ad-number">403</h1>
        </div>

        {/* Shield Icon */}
        <div className="ad-shield-wrapper">
          <div className="ad-shield-circle">
            <FiShield className="ad-shield-icon" />
          </div>
          <div className="ad-shield-pulse"></div>
        </div>

        {/* Floating Icons */}
        <div className="ad-floating-icons">
          <div className="ad-float-icon ad-float-1">
            <FiLock />
          </div>
          <div className="ad-float-icon ad-float-2">
            <FiUser />
          </div>
          <div className="ad-float-icon ad-float-3">
            <FiSettings />
          </div>
          <div className="ad-float-icon ad-float-4">
            <FiFolder />
          </div>
          <div className="ad-float-icon ad-float-5">
            <FiAlertTriangle />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="ad-shapes">
          <div className="ad-shape ad-shape-1"></div>
          <div className="ad-shape ad-shape-2"></div>
          <div className="ad-shape ad-shape-3"></div>
          <div className="ad-shape ad-shape-4"></div>
          <div className="ad-shape ad-shape-5"></div>
        </div>

        {/* Permission Card Visual */}
        <div className="ad-permission-card">
          <div className="ad-perm-header">
            <FiShield className="ad-perm-shield" />
            <span>PERMISSION REQUIRED</span>
          </div>
          <div className="ad-perm-body">
            <div className="ad-perm-line ad-perm-line-short"></div>
            <div className="ad-perm-line"></div>
            <div className="ad-perm-line ad-perm-line-medium"></div>
          </div>
          <div className="ad-perm-denied">
            <FiLock />
            <span>ACCESS DENIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedIllustration;