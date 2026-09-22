// src/components/error/ComingSoonIllustration.jsx
import React from 'react';
import { FiZap, FiCalendar, FiFolder, FiBarChart2, FiBell, FiFileText, FiActivity } from 'react-icons/fi';

const ComingSoonIllustration = () => {
  return (
    <div className="cs-illustration">
      <div className="cs-illustration-main">
        {/* Rocket Icon */}
        <div className="cs-rocket-wrapper">
          <div className="cs-rocket-circle">
            <FiZap className="cs-rocket-icon" />
          </div>
          <div className="cs-rocket-trail">
            <span className="cs-trail-dot cs-trail-1"></span>
            <span className="cs-trail-dot cs-trail-2"></span>
            <span className="cs-trail-dot cs-trail-3"></span>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="cs-floating-icons">
          <div className="cs-float-icon cs-float-1">
            <FiCalendar />
          </div>
          <div className="cs-float-icon cs-float-2">
            <FiFolder />
          </div>
          <div className="cs-float-icon cs-float-3">
            <FiBarChart2 />
          </div>
          <div className="cs-float-icon cs-float-4">
            <FiBell />
          </div>
          <div className="cs-float-icon cs-float-5">
            <FiFileText />
          </div>
          <div className="cs-float-icon cs-float-6">
            <FiActivity />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="cs-shapes">
          <div className="cs-shape cs-shape-1"></div>
          <div className="cs-shape cs-shape-2"></div>
          <div className="cs-shape cs-shape-3"></div>
          <div className="cs-shape cs-shape-4"></div>
          <div className="cs-shape cs-shape-5"></div>
        </div>

        {/* Preview Card */}
        <div className="cs-preview-card">
          <div className="cs-preview-header">
            <span className="cs-preview-badge">NEW FEATURE</span>
          </div>
          <div className="cs-preview-body">
            <div className="cs-preview-line cs-preview-line-short"></div>
            <div className="cs-preview-line"></div>
            <div className="cs-preview-line cs-preview-line-medium"></div>
          </div>
          <div className="cs-preview-footer">
            <FiZap />
            <span>COMING SOON</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonIllustration;
