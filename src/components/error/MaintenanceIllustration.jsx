// src/components/error/MaintenanceIllustration.jsx
import React from 'react';
import { FiSettings, FiTool, FiCloud, FiHardDrive, FiDatabase, FiActivity } from 'react-icons/fi';

const MaintenanceIllustration = () => {
  return (
    <div className="maint-illustration">
      <div className="maint-illustration-main">
        {/* Gear Icon */}
        <div className="maint-gear-wrapper">
          <div className="maint-gear-circle">
            <FiSettings className="maint-gear-icon maint-spin-slow" />
          </div>
          <div className="maint-gear-circle-sm">
            <FiSettings className="maint-gear-icon-sm maint-spin-reverse" />
          </div>
        </div>

        {/* Floating Icons */}
        <div className="maint-floating-icons">
          <div className="maint-float-icon maint-float-1">
            <FiTool />
          </div>
          <div className="maint-float-icon maint-float-2">
            <FiCloud />
          </div>
          <div className="maint-float-icon maint-float-3">
            <FiHardDrive />
          </div>
          <div className="maint-float-icon maint-float-4">
            <FiDatabase />
          </div>
          <div className="maint-float-icon maint-float-5">
            <FiActivity />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="maint-shapes">
          <div className="maint-shape maint-shape-1"></div>
          <div className="maint-shape maint-shape-2"></div>
          <div className="maint-shape maint-shape-3"></div>
          <div className="maint-shape maint-shape-4"></div>
          <div className="maint-shape maint-shape-5"></div>
        </div>

        {/* Progress Card Visual */}
        <div className="maint-progress-card">
          <div className="maint-progress-header">
            <FiSettings className="maint-progress-gear maint-spin-slow" />
            <span>MAINTENANCE IN PROGRESS</span>
          </div>
          <div className="maint-progress-body">
            <div className="maint-progress-bar-wrapper">
              <div className="maint-progress-bar" style={{ width: '65%' }}></div>
            </div>
            <span className="maint-progress-text">65% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceIllustration;