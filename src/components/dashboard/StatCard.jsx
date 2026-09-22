import React from 'react';

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className={`stat-card stat-card-${stat.color || 'primary'}`}>
      <div className="stat-card-content">
        <div className="stat-card-info">
          <span className="stat-card-title">{stat.title}</span>
          <strong className="stat-card-value">{stat.value}</strong>
          <span className="stat-card-growth">{stat.growth}</span>
        </div>
        <div className="stat-card-icon">
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
