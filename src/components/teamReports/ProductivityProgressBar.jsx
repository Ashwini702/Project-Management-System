// src/components/teamReports/ProductivityProgressBar.jsx
import React from 'react';
const ProductivityProgressBar = ({ score }) => {
  const getColor = () => { if (score >= 90) return 'var(--success-color)'; if (score >= 71) return 'var(--primary-color)'; if (score >= 41) return 'var(--warning-color)'; return 'var(--danger-color)'; };
  return <div className="progress tdr-progress"><div className="progress-bar" style={{ width: `${score}%`, backgroundColor: getColor() }}></div></div>;
};
export default ProductivityProgressBar;