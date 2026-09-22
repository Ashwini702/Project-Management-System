// src/components/error/ServerErrorIllustration.jsx
import React from 'react';
import { FiServer, FiCloud, FiDatabase, FiAlertTriangle, FiWifi, FiActivity } from 'react-icons/fi';

const ServerErrorIllustration = () => {
  return (
    <div className="server-error-illustration">
      <div className="se-illustration-main">
        {/* Large 500 Number */}
        <div className="se-number-wrapper">
          <h1 className="se-number">500</h1>
        </div>

        {/* Server Icon */}
        <div className="se-server-wrapper">
          <div className="se-server-circle">
            <FiServer className="se-server-icon" />
          </div>
          <div className="se-server-pulse"></div>
        </div>

        {/* Floating Icons */}
        <div className="se-floating-icons">
          <div className="se-float-icon se-float-1">
            <FiCloud />
          </div>
          <div className="se-float-icon se-float-2">
            <FiDatabase />
          </div>
          <div className="se-float-icon se-float-3">
            <FiAlertTriangle />
          </div>
          <div className="se-float-icon se-float-4">
            <FiWifi />
          </div>
          <div className="se-float-icon se-float-5">
            <FiActivity />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="se-shapes">
          <div className="se-shape se-shape-1"></div>
          <div className="se-shape se-shape-2"></div>
          <div className="se-shape se-shape-3"></div>
          <div className="se-shape se-shape-4"></div>
          <div className="se-shape se-shape-5"></div>
        </div>

        {/* Broken Server Card */}
        <div className="se-server-card">
          <div className="se-server-card-header">
            <div className="se-server-dot se-server-dot-red"></div>
            <div className="se-server-dot se-server-dot-yellow"></div>
            <div className="se-server-dot se-server-dot-green"></div>
          </div>
          <div className="se-server-card-body">
            <div className="se-server-line se-server-line-short"></div>
            <div className="se-server-line"></div>
            <div className="se-server-line se-server-line-medium"></div>
            <div className="se-server-error-badge">
              <FiAlertTriangle />
              <span>SERVER ERROR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorIllustration;