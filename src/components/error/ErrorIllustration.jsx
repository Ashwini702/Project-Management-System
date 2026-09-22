// src/components/error/ErrorIllustration.jsx
import React from 'react';
import { FiFile, FiSearch, FiFolder, FiCheckSquare, FiAlertCircle } from 'react-icons/fi';

const ErrorIllustration = () => {
  return (
    <div className="error-illustration">
      <div className="illustration-main">
        {/* Large 404 Number */}
        <div className="error-number-wrapper">
          <h1 className="error-number">404</h1>
        </div>

        {/* Floating Project Icons */}
        <div className="floating-icons">
          <div className="float-icon float-icon-1">
            <FiFolder />
          </div>
          <div className="float-icon float-icon-2">
            <FiCheckSquare />
          </div>
          <div className="float-icon float-icon-3">
            <FiFile />
          </div>
          <div className="float-icon float-icon-4">
            <FiSearch />
          </div>
          <div className="float-icon float-icon-5">
            <FiAlertCircle />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="illustration-shapes">
          <div className="error-shape error-shape-1"></div>
          <div className="error-shape error-shape-2"></div>
          <div className="error-shape error-shape-3"></div>
          <div className="error-shape error-shape-4"></div>
          <div className="error-shape error-shape-5"></div>
        </div>

        {/* Broken Page Card */}
        <div className="broken-card">
          <div className="broken-card-header">
            <div className="broken-dot broken-dot-red"></div>
            <div className="broken-dot broken-dot-yellow"></div>
            <div className="broken-dot broken-dot-green"></div>
          </div>
          <div className="broken-card-body">
            <div className="broken-line broken-line-short"></div>
            <div className="broken-line"></div>
            <div className="broken-line broken-line-medium"></div>
            <div className="broken-line broken-line-short"></div>
            <div className="broken-icon"><FiFile /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorIllustration;