// src/components/common/PageHeader.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const PageHeader = ({ title, subtitle, showButton = true, buttonText = 'Create Project', onButtonClick, children }) => {
  return (
    <div className="page-header">
      <div className="header-content">
        <div className="header-text">
          <h2 className="header-title">{title}</h2>
          <p className="header-subtitle">{subtitle}</p>
        </div>
        {children}
        {showButton && (
          <button type="button" className="btn btn-primary create-btn" onClick={onButtonClick}>
            <FiPlus className="me-2" />
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

