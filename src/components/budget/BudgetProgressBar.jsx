// src/components/budget/BudgetProgressBar.jsx
import React from 'react';

const BudgetProgressBar = ({ used, total }) => {
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;
  const getColor = () => {
    if (percent >= 91) return 'var(--danger-color)';
    if (percent >= 76) return 'var(--warning-color)';
    if (percent >= 51) return 'var(--primary-color)';
    return 'var(--success-color)';
  };
  return (
    <div className="budget-progress-wrapper">
      <div className="progress budget-progress"><div className="progress-bar" style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: getColor() }}></div></div>
      <span className="budget-progress-text">{percent}% used</span>
    </div>
  );
};

export default BudgetProgressBar;