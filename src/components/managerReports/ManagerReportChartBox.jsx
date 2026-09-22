// src/components/managerReports/ManagerReportChartBox.jsx
import React from 'react';

const ManagerReportChartBox = ({ title, data, type = 'bar', total, subtitle }) => {
  const colors = ['var(--primary-color)', 'var(--success-color)', 'var(--warning-color)', 'var(--danger-color)', 'var(--accent-purple)', 'var(--secondary-color)'];
  return (
    <div className="mrpt-chart-box">
      <div className="chart-header"><h6>{title}</h6>{subtitle && <span className="chart-subtitle">{subtitle}</span>}</div>
      <div className="chart-body">
        {type === 'bar' && data.map((item, i) => (
          <div key={i} className="chart-bar-row">
            <div className="chart-bar-label"><span className="chart-dot" style={{ backgroundColor: item.color || colors[i] }}></span>{item.label}</div>
            <div className="chart-bar-wrapper"><div className="chart-bar" style={{ width: `${item.percentage || (item.value / (total || 100)) * 100}%`, backgroundColor: item.color || colors[i] }}></div></div>
            <span className="chart-bar-value">{item.value}{item.suffix || ''}</span>
          </div>
        ))}
        {type === 'stat' && <div className="chart-stat-grid">{data.map((item, i) => <div key={i} className="chart-stat-item"><span className="chart-stat-value" style={{ color: item.color || colors[i] }}>{item.value}</span><span className="chart-stat-label">{item.label}</span></div>)}</div>}
      </div>
    </div>
  );
};
export default ManagerReportChartBox;