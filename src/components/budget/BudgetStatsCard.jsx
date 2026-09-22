// src/components/budget/BudgetStatsCard.jsx
import React from 'react';
import { FiDollarSign, FiTrendingDown, FiCheckCircle, FiClock, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';

const iconMap = { FiDollarSign, FiTrendingDown, FiCheckCircle, FiClock, FiTrendingUp, FiAlertTriangle };

const BudgetStatsCard = ({ stat }) => {
  const cmap = { primary: 'bgt-stat-primary', danger: 'bgt-stat-danger', success: 'bgt-stat-success', warning: 'bgt-stat-warning', info: 'bgt-stat-info', purple: 'bgt-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`bgt-stat-card ${cmap[stat.color]}`}>
      <div className="bgt-stat-content">
        <div className="bgt-stat-icon-wrapper"><Icon className="bgt-stat-icon" /></div>
        <div className="bgt-stat-info"><h3 className="bgt-stat-value">{stat.value}</h3><p className="bgt-stat-title">{stat.title}</p><span className="bgt-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};

export default BudgetStatsCard;